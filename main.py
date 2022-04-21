# from grpc import protos_and_services

from email import message
from flask import Flask, request, render_template
from flask_restful import Resource, Api
from grpc import Status
from joblib import PrintTime
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

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(100), unique=False, nullable=True)
    user_email = db.Column(db.String(150), unique=False, nullable=True)
    user_password = db.Column(db.String(150), unique=False, nullable=True)

# end










# api

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


class Signup(Resource):
    def __init__(self):
        pass

    """
    this API will check if the given email already exist or not
    and if it does not it will create the user and send back the response
    accordingly but if user does exist it will not create a user and then
    send a response accordingly 
    """
    def post(self):
        print("****************** in signup (post method)")

        userNameInp = request.form.get("userName")
        userEmailInp = request.form.get("userEmail")
        userPasswordInp = request.form.get("userPassword")

        # print(userNameInp)
        # print(userEmailInp)
        # print(userPasswordInp)

        apiResponse = {} # making a empty dict variable

        existingUser = User.query.filter_by(user_email = userEmailInp).all()
        # print(existingUser)

        if(len(existingUser) == 0):
            try:
                userEntry = User( user_name = userNameInp, user_email = userEmailInp ,user_password = userPasswordInp )
                db.session.add(userEntry)
                db.session.commit()
            except :
                apiResponse = {
                    "api_status": SERVER_ERROR_INTERNAL_SERVER_ERROR,
                    "message": "Oops! seems like some error occurred server",
                }
            else: #else block of try, this will run when no error occurs and the user is created successfully
                apiResponse = {
                    "api_status": SUCCESS_OK,
                    "status": USER_CREATED,
                    "message": "user created",
                }
        
        else:
            apiResponse = {
                "api_status": SUCCESS_OK,
                "status": EMAIL_EXIST,
                "message": "this email already exist",
            }
        
        return jsonify(apiResponse)
        

class Login(Resource):

    def post(self):
        print("********************************* in Login (post method)")
        
        userEmailInp = request.form.get("userEmail")
        userPasswordInp = request.form.get("userPassword")
   
        # print(userEmailInp)
        # print(userPasswordInp)

        apiResponse = {} # making a empty dict variable

        existingUser = User.query.filter_by( user_email = userEmailInp, user_password = userPasswordInp ).all()

        if(len(existingUser) != 0):
            try:
                apiResponse = {
                    "api_status": SUCCESS_OK,
                    "status": USER_EXIST,
                    "message": "authentication successfull",
                    "user_id": existingUser[0].user_id
                }
                
            except :
                apiResponse = {
                    "api_status": SERVER_ERROR_INTERNAL_SERVER_ERROR,
                    "message": "Oops! seems like some error occurred server",
                }    
        
        else:
            apiResponse = {
                "api_status": SUCCESS_OK,
                "status": USER_NOT_EXIST,
                "message": "authentication failed",
            }
        
        return jsonify(apiResponse)



class IsUserNameSelected(Resource):

    def post(self):
        print("********************************* in UserNameSelection (get method)")

        userId = request.form.get("userId")

        print(userId)

        apiResponse = {} # making a empty dict variable

        try:
            existingUser = User.query.filter_by( user_id = userId ).all()

            if (len(existingUser) != 0):
                if(existingUser[0].user_id != "N/A"):
                    apiResponse = {
                        "api_status": SUCCESS_OK,
                        "status": USER_NAME_SELECTED,
                        "message": "user name already selected",
                    }
                else:
                    apiResponse = {
                        "api_status": SUCCESS_OK,
                        "status": USER_NAME_NOT_SELECTED,
                        "message": "user name not selected",
                    }

            else:
                apiResponse = {
                    "api_status": SUCCESS_OK,
                    "status": USER_NOT_EXIST,
                    "message": "user name can be selected",
                }
                
                

        except Exception as e:
            print(e)
            apiResponse = {
                "api_status": SERVER_ERROR_INTERNAL_SERVER_ERROR,
                "message": "Oops! seems like some error occurred server",
            }

        
            

        
        return jsonify(apiResponse)






        
# end










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





api.add_resource(Signup,"/signup")
api.add_resource(Login,"/login")
api.add_resource(IsUserNameSelected,"/isUserNameSelected")


if  __name__ == "__main__":
    # sayHello()
    sayImported()
    # print(Dummytable.query.all())
    app.run(debug = True)
    

    
