import sys, os
import time

INTERP = os.path.join(os.environ['HOME'], 'parents.myplex.life', 'venv/bin', 'python')
if sys.executable != INTERP:
    os.execl(INTERP, INTERP, *sys.argv)
sys.path.append(os.getcwd())

import logging
import pymysql
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine
from json import dumps
import simplejson as json
from flask import Flask, redirect

logger = logging.getLogger()

# create a file handler
handler = logging.FileHandler('hello.log')
handler.setLevel(logging.INFO)

# create a logging format
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)

# add the handlers to the logger
logger.addHandler(handler)

db_connect = create_engine('mysql+pymysql://phelper:Lscooter11@MYSQL.PARENTS.MYPLEX.LIFE:3306/phelper')
application = Flask(__name__)
application.config['CORS_HEADERS'] = 'Content-Type'
api = Api(application)
cors = CORS(application, resources={r"*": {"origins": "*"}})


@application.route('/')
# @application.route('/implicit/callback')
@cross_origin(origin="*", headers=['Content- Type', 'Authorization'])
def index():
    return 'hello'


class Tags(Resource):
    def get(self):
        conn = db_connect.connect()
        query = conn.execute("select * from tags")
        result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
        return jsonify(result)

    def put(self):
        conn = db_connect.connect()
        tag = request.json['tag']
        query = conn.execute("insert into tags(tag) values('{0}')".format(tag))
        return {'status': 'Tag Added'}


class AddTags(Resource):
    def put(self, taskid):
        conn = db_connect.connect()  # connect to database
        tags = request.json['tags']
        query = conn.execute("insert into  taskids(taskid,tagid) values({0},{1})".format(taskid, tags))
        return {'status': 'success'}


class NewTasksInternal(Resource):
    def post(self):
        logging.info('connecting')
        conn = db_connect.connect()
        logging.info('connected')
        logging.debug(request.json)
        print(request.json)
        task = request.json['task']
        ts = time.time()
        familyid = request.json['familyid']
        approved = request.json['approved']
        title = request.json['title']
        query = conn.execute("insert into tasks(task,familyid,approved,title,addedts) values('{0}','{1}','{2}','{3}','{4}')".format(task, familyid, approved,title,ts))
        return {'status': 'success'}


class NewTasksExternal(Resource):
    def get(self):
        args = request.args
        task = args['task']
        task1 = task.encode('ascii', 'ignore')
        title = args['title']
        ts = time.time()
        title1 = title.encode('ascii', 'ignore')
        conn = db_connect.connect()  # connect to databas
        query = conn.execute("insert into  tasks(task,title,familyid,addedts) values('{0}','{1}','4','{2}' )".format(task1, title1,ts))
        return {'status': 'success'}


class UserEmail(Resource):
    def get(self, email):
        conn = db_connect.connect()
        query = conn.execute("select a.familyid from person a  where a.email  ='{0}'".format(email))
        result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
        return result[0]


class UserTasks(Resource):
    def get(self, familyid):
        conn = db_connect.connect()
        query = conn.execute("select a.summary as summary,a.title,a.task as task,a.id,lastupdate,a.familyid,GROUP_CONCAT(c.tag) as tags  from tasks a left join taskids b on a.id = b.taskid left join tags c on b.tagid = c.id  where familyid  ='{0}' and approved is not null group by a.task,a.id,a.familyid order by lastupdate desc".format(familyid))
        result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
        return jsonify(result)

class UserTasksMostRead(Resource):
    def get(self, familyid):
        conn = db_connect.connect()
        query = conn.execute("select a.summary as summary,a.title,a.task as task,a.id,lastupdate,a.familyid,GROUP_CONCAT(c.tag)  as tags  from tasks a left join taskids b on a.id = b.taskid left join tags c on b.tagid = c.id  where familyid  ='{0}' and approved is not null and readcount > 0 group by a.task,a.id,a.familyid order by readcount desc".format(familyid))
        result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
        return jsonify(result)


class ApprovalQueue(Resource):
    def get(self, familyid):
        conn = db_connect.connect()
        query = conn.execute("select a.summary as summary,a.title,a.task as task,a.id,lastupdate,a.familyid,GROUP_CONCAT(c.tag) as tags  from tasks a left join taskids b on a.id = b.taskid left join tags c on b.tagid = c.id  where familyid  ='{0}' and approved is null group by a.task,a.id,a.familyid order by lastupdate desc".format(familyid))
        result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
        return jsonify(result)



class ApproveTask(Resource):
    def put(self, id):
        conn = db_connect.connect()  # connect to database
        query = conn.execute("update tasks set approved  = 1  where id = {0}".format(id))
        return {'status': 'success'}


class TaskDetail(Resource):
    def put(self, id):
        conn = db_connect.connect()  # connect to database
        task = request.json['task']
        title = request.json['title']
        summary = request.json['summary']
        query = conn.execute("update tasks set task = '{0}', title = '{2}',summary = '{3}'  where id = {1}".format(task, id, title,summary))
        return {'status': 'success'}

    def delete(self, id):
        logging.info('connecting')
        conn = db_connect.connect()
        logging.info('connected')
        logging.debug(request.json)
        print(request.json)
        query = conn.execute("delete from tasks where id = '{0}'".format(id))
        return {'status': 'success'}

    def get(self, id):
        conn = db_connect.connect()
        query = conn.execute("select a.summary as summary,a.title,a.task as task,a.id,lastupdate,a.familyid,GROUP_CONCAT(c.tag) as tags  from tasks a left join taskids b on a.id = b.taskid left join tags c on b.tagid = c.id  where a.id  ='{0}' and approved is not null group by a.task,a.id,a.familyid".format(id))
        result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
        return jsonify(result)

    def post(self,id):
        conn = db_connect.connect()
        query = conn.execute("update tasks set readcount = readcount+1 where id = {0}".format(id))
        return {'status': 'read count updated'}


api.add_resource(NewTasksInternal, '/new/tasks')    # used
api.add_resource(NewTasksExternal, '/external/tasks')    # used
api.add_resource(TaskDetail, '/task/<id>')   # used
api.add_resource(UserTasksMostRead,'/read/tasks/<familyid>')
api.add_resource(UserTasks, '/tasks/<familyid>')   # used
api.add_resource(UserEmail, '/person/<email>')    # used
api.add_resource(Tags, '/tags')    # used
api.add_resource(AddTags, '/add/tags/<taskid>')    # used
api.add_resource(ApproveTask, '/app/task/<id>')   # used
api.add_resource(ApprovalQueue, '/approve/tasks/<familyid>')   # used
