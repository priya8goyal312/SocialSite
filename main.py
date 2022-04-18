# from grpc import protos_and_services

from flask import Flask, request, render_template
from flask_restful import Resource, Api
from requests import delete
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import true
from flask import jsonify
import utility

# from utility.dbModel import *
from utility.constants import *

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/socialsite'
db = SQLAlchemy(app)


api = Api(app)






# models

class Dummytable(db.Model):
    sno = db.Column(db.Integer, primary_key=True)
    dummy_content = db.Column(db.String(150), unique=False, nullable=True)

# end



class TemplateForOtherClasses(Resource):
    def __init__(self):
        pass

    def get(self):
        pass

    def post(self):
        pass

    def delete(self):
        pass

class LandingPage(Resource):

    def get(self):
        return render_template('index.html')

class HelloWorld(Resource):
    def __init__(self):
        pass

    def get(self):
        print(dict(Dummytable.query.all()))
        dummyDict = {
            "hello" : "first API"
        }
        return dummyDict


# api.add_resource(HelloWorld,"/")





# app route
@app.route('/')
def index():
   return render_template('index.html')

@app.route('/loginPage')
def loginPage():
   return render_template('login.html')

@app.route('/signupPage')
def signupPage():
   return render_template('signUp.html')

@app.route('/userNameSelectionPage')
def userNameSelectionPage():
   return render_template('userNameSelection.html')


# end



if  __name__ == "__main__":
    # sayHello()
    sayImported()
    # print(Dummytable.query.all())
    app.run(debug = True)
    

    
