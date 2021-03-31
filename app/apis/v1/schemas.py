def user_schema(user):
    return {
        'code': 200,
        'userId': user.id,
        'username': user.username,
        'timestamp': user.timestamp
    }


def emotion_schema(emotion):
    result = {
        'code': 200,
        'id': emotion.id,
        'title': emotion.title,
        'companion': emotion.companion,
        'location': emotion.location,
        'details': emotion.details,
        'entry': emotion.entry,
        'emotions': [],
        'timestamp': emotion.timestamp,
    }
    count = 0
    for each in emotion.emotion.split(','):
        result['emotions'].append({
            'id': count,
            'emotion': each,
            'level': emotion.level.split(',')[count]
        })
        count += 1
    return result


def daily_emotions_schema(items, pagination):
    return {
        'code': 200,
        'count': pagination.total,
        'totalPages': pagination.pages,
        'current': pagination.page,
        'data': [emotion_schema(item) for item in items]
    }


def emotions_schema(items, pagination):
    results = {
        'code': 200,
        'count': pagination.total,
        'totalPages': pagination.pages,
        'current': pagination.page,
        'data': []
    }
    for item in items:
        results['data'].append({
            'time': item[1],
            'entry': item[2],
            'count': item[3]
        })
    return results
