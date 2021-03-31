from flask import Flask, jsonify

import os
import click
from faker import Faker

from app.apis.v1 import api_v1
from app.models import User, Mood
from app.settings import config
from app.extensions import db, migrate

basedir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))


def create_app(config_name=None):
    if config_name is None:
        config_name = os.getenv('FLASK_CONFIG', 'development')
    app = Flask('app')
    app.config.from_object(config[config_name])

    register_blueprints(app)
    register_extensions(app)
    register_errors(app)
    register_shell_context(app)
    register_commands(app)
    return app


def register_blueprints(app):
    app.register_blueprint(api_v1, url_prefix='/api/v1')


def register_extensions(app):
    db.init_app(app)
    migrate.init_app(app, db)


def register_shell_context(app):
    @app.shell_context_processor
    def make_shell_context():
        return dict(db=db, User=User, Mood=Mood)


def register_errors(app):
    @app.errorhandler(404)
    def page_not_found(e):
        response = jsonify(code=404, message='The requested URL was not found on the server.')
        response.status_code = 404
        return response

    @app.errorhandler(405)
    def method_not_allowed(e):
        response = jsonify(code=405, message='The method is not allowed for the requested URL.')
        response.status_code = 405
        return response

    @app.errorhandler(500)
    def internal_server_error(e):
        response = jsonify(code=500, message='An internal server error occurred.')
        response.status_code = 500
        return response


def register_commands(app):
    @app.cli.command()
    @click.option('--drop', is_flag=True, help='重建数据库')
    def initdb(drop):
        if drop:
            click.confirm('这个操作会删除你的数据库，确定吗？', abort=True)
            db.drop_all()
            click.echo('删除数据表')
        db.create_all()
        user = User(username='admin')
        user.set_password('123456')
        db.session.add(user)
        db.session.commit()
        click.echo('初始化数据库')

    @app.cli.command()
    def fake_mood():
        fake = Faker("zh_CN")
        emotion_list = ['Confident', 'Excited', 'Fulfilled', 'Grateful', 'Happy',
                        'Inspired', 'Joy', 'Loved', 'Motivated', 'Optimistic',
                        'Peaceful', 'Proud', 'Relaxed', 'Relieved', 'Satisfied',
                        'Angry', 'Disappointed', 'Embarrassed', 'Empty',
                        'Frustrated', 'Guilty', 'Hopeless', 'Lonely', 'Nervous',
                        'Overwhelmed', 'Sad', 'Scared', 'Stressed', 'Tired',
                        'Worried']
        entry_list = ['Good', 'Bad', 'Neutral', 'Terrible', 'Terrific']
        for i in range(50):
            mood = Mood(title=fake.street_name(), companion=fake.name(), location=fake.city(),
                        details=fake.text(max_nb_chars=200), timestamp=fake.
                        date_time_this_year(before_now=True, after_now=False, tzinfo=None), entry=entry_list[fake.pyint(0, 4)],
                        emotion=emotion_list[fake.pyint(0, 29)], level=str(fake.pyint(0, 2))+','+str(fake.pyint(0, 2)))
            db.session.add(mood)
            db.session.commit()
            click.echo('正在生成第{}条数据'.format(i))
        click.echo('Done')
