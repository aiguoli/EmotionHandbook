from datetime import datetime, timedelta

from flask import jsonify, request, g
from flask.views import MethodView

from app.apis.v1 import api_v1
from app.models import User, Mood
from app.extensions import db
from app.apis.v1.schemas import user_schema, daily_emotions_schema, emotion_schema, emotions_schema
from app.apis.v1.errors import api_abort
from app.apis.v1.auth import auth_required, generate_token
from sqlalchemy import and_, extract, func


def get_data(key):
    if request.get_json():
        return request.get_json().get(key)
    return None


class UserAPI(MethodView):
    decorators = [auth_required]

    def get(self):
        return jsonify(user_schema(g.current_user))


class RegisterAPI(MethodView):

    def post(self):
        username = get_data('username')
        password = get_data('password')
        existed = User.query.filter_by(username=username).first()
        if existed:
            return jsonify(code=400, message='This user has been registered!')
        user = User(username=username)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return jsonify(user_schema(user))


class ItemAPI(MethodView):
    decorators = [auth_required]

    def get(self):
        mood_id = request.args.get('moodId')
        mood = Mood.query.get_or_404(mood_id)
        return jsonify(emotion_schema(mood))

    def post(self):
        item = get_data('item')
        created = item['time']
        mood = Mood(title=item['title'], companion=item['companion'], location=item['location'], details=item['details'],
                    entry=item['entry'], emotion=item['emotion'], level=item['level'], author_id=g.current_user.id,
                    timestamp=datetime.strptime(created, "%Y-%m-%d %H"))
        db.session.add(mood)
        db.session.commit()
        return jsonify(emotion_schema(mood))

    def put(self):
        item = get_data('item')
        mood = Mood.query.get(item['id'])
        if g.current_user.id != mood.author_id:
            return jsonify({'code': 403, 'msg': 'this is not your mood'})
        mood.title = item['title']
        mood.companion = item['companion']
        mood.location = item['location']
        mood.details = item['details']
        mood.entry = item['entry']
        mood.emotion = item['emotion']
        mood.level = item['level']
        db.session.commit()
        return '', 204


class DailyItemAPI(MethodView):
    # 查找某一天的心情
    decorators = [auth_required]

    def post(self):
        """
        json格式传入时间
        如："2020-08-21"
        :return:
        json格式emotion列表
        """
        date = get_data('date').split('-')
        page = request.args.get('page', 1, type=int)
        pagination = Mood.query.filter(and_(extract('year', Mood.timestamp) == date[0],
                                            extract('month', Mood.timestamp) == date[1],
                                            extract('day', Mood.timestamp) == date[2],
                                            Mood.author_id == g.current_user.id)).paginate(page, per_page=4)
        items = pagination.items
        results = daily_emotions_schema(items, pagination)
        return jsonify(results)


class PeriodItemAPI(MethodView):
    decorators = [auth_required]

    def post(self):
        """
        传入数据
        {
            "startTime": "2020-01-01",
            "endTime": "2020-05-26"
        }
        :return:
        json格式emotion列表
        """
        start = get_data('startTime')
        start = datetime.strptime(start, '%Y-%m-%d')
        end = get_data('endTime')
        end = datetime.strptime(end, '%Y-%m-%d')
        page = request.args.get('page', 1, type=int)
        pagination = db.session.query(func.date(Mood.timestamp).label('date'), Mood.timestamp, Mood.entry, func.count(Mood.id))\
            .group_by('date').filter(and_(Mood.timestamp >= start, Mood.timestamp <= end,
                                          Mood.author_id == g.current_user.id)).paginate(page, per_page=9)
        items = pagination.items
        return jsonify(emotions_schema(items, pagination))


class SearchItemAPI(MethodView):
    decorators = [auth_required]

    def post(self):
        method = get_data('method')
        content = get_data('content')
        page = request.args.get('page', 1, type=int)
        pagination = ''
        if method == 'companion':
            pagination = Mood.query.filter(Mood.author_id == g.current_user.id, Mood.companion.like('%'+content+'%'))\
                .paginate(page, per_page=4)
        if method == 'location':
            pagination = Mood.query.filter(Mood.author_id == g.current_user.id, Mood.location == content)\
                .paginate(page, per_page=4)
        if method == 'emotion':
            pagination = Mood.query.filter(Mood.author_id == g.current_user.id, Mood.emotion.like('%'+content+'%'))\
                .paginate(page, per_page=4)
        items = pagination.items
        return jsonify(daily_emotions_schema(items, pagination))


class AuthTokenAPI(MethodView):

    def post(self):
        grant_type = request.form.get('grant_type')
        username = request.form.get('username')
        password = request.form.get('password')

        if grant_type is None or grant_type.lower() != 'password':
            return jsonify(code=400, message='The grant type must be password.')

        user = User.query.filter_by(username=username).first()
        if user is None or not user.validate_password(password):
            return jsonify(code=401, message='Either the username or password was invalid.')

        token, expiration = generate_token(user)

        response = jsonify({
            'token': token,
            'token_type': 'Bearer',
            'username': username,
            'id': user.id,
            'expires_in': expiration
        })
        response.headers['Cache-Control'] = 'no-store'
        response.headers['Pragma'] = 'no-cache'
        return response


api_v1.add_url_rule('/oauth/token', view_func=AuthTokenAPI.as_view('token'), methods=['POST'])
api_v1.add_url_rule('/user', view_func=UserAPI.as_view('user'), methods=['GET'])
api_v1.add_url_rule('/user/register', view_func=RegisterAPI.as_view('register'), methods=['POST'])
api_v1.add_url_rule('/item', view_func=ItemAPI.as_view('item'), methods=['GET', 'POST', 'PUT'])
api_v1.add_url_rule('/items/daily', view_func=DailyItemAPI.as_view('daily'), methods=['POST'])
api_v1.add_url_rule('/items/period', view_func=PeriodItemAPI.as_view('period'), methods=['POST'])
api_v1.add_url_rule('/search', view_func=SearchItemAPI.as_view('search'), methods=['POST'])
