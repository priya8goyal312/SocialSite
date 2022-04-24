# from grpc import protos_and_services

from email import message
from enum import unique
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
    user_id         = db.Column(db.Integer, primary_key=True)
    user_name       = db.Column(db.String(100), unique=False, nullable=True)
    user_email      = db.Column(db.String(150), unique=False, nullable=True)
    user_password   = db.Column(db.String(150), unique=False, nullable=True)

    profile = db.relationship("Profile", backref='user', lazy=True)

class Profile(db.Model):

    s_no                    = db.Column(db.Integer, primary_key=True)
    user_id                 = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=True)
    user_actual_name        = db.Column(db.String(100), unique=False, nullable=True)
    user_profile_picture    = db.Column(db.Text, unique=False, nullable=True)	
    user_bio                = db.Column(db.String(100), unique=False, nullable=True)
    user_accout_view        = db.Column(db.String(15), unique=False, nullable=True)
    user_total_post         = db.Column(db.Integer, unique=False, nullable=True)
    user_total_follower     = db.Column(db.Integer, unique=False, nullable=True)
    user_total_following    = db.Column(db.Integer, unique=False, nullable=True)



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
        print("********************************* in UserNameSelection (post method)")

        userId = request.form.get("userId")

        print(userId)

        apiResponse = {} # making a empty dict variable

        try:
            existingUser = User.query.filter_by( user_id = userId ).all()

            if (len(existingUser) != 0):

                if(existingUser[0].user_name != "N/A"):
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



class CheckUserNameAvailability(Resource):

    def post(self):
        print("********************************* in CheckUserNameAvailability (post method)")

        userNameInp = request.form.get("userNameInp")

        print(userNameInp)

        apiResponse = {} # making a empty dict variable

        try:
            existingUser = User.query.filter_by( user_name = userNameInp ).all()

            if (len(existingUser) != 0):
                apiResponse = {
                    "api_status": SUCCESS_OK,
                    "status": USER_NAME_EXIST,
                    "message": "user name already selected",
                }

            else:
                apiResponse = {
                    "api_status": SUCCESS_OK,
                    "status": USER_NAME_DOES_NOT_EXIST,
                    "message": "user name already selected",
                }
                
        except Exception as e:
            print(e)
            apiResponse = {
                "api_status": SERVER_ERROR_INTERNAL_SERVER_ERROR,
                "message": "Oops! seems like some error occurred server",
            }


        return jsonify(apiResponse)



class SetUserName(Resource):

    def post(self):
        print("********************************* in SetUserName (post method)")

        userId = request.form.get("userId")
        userNameInp = request.form.get("userNameInp")

        print(userNameInp)

        apiResponse = {} # making a empty dict variable

        try:
            userData = User.query.filter_by(user_id = userId).first()
            userData.user_name = userNameInp
            db.session.commit()

            apiResponse = {
                "api_status": SUCCESS_OK,
                "status": USER_NAME_CHANGE_SUCCESS,
                "message": "user name set successfully"
            }

        except Exception as e:
            print(e)
            apiResponse = {
                "api_status": SERVER_ERROR_INTERNAL_SERVER_ERROR,
                "status": USER_NAME_CHANGE_FAIL,
                "message": "Oops! seems like some error occurred server"
            }

        return jsonify(apiResponse)


class MakeProfile(Resource):

    def post(self):
        print("********************************* in Make Profile (post method)")

        userId = request.form.get("userId")

        # print(userId)

        apiResponse = {} # making a empty dict variable

        try:
            profileExist = Profile.query.filter_by( user_id = userId ).all()

            if( len(profileExist) == 0 ):
    
                profileEntry = Profile( user_id = userId, user_actual_name = "N/A", user_profile_picture = "defaultAvatar", user_bio = "N/A", user_accout_view = "private", user_total_post = 0, user_total_follower = 0, user_total_following = 0  )
                db.session.add(profileEntry)
                db.session.commit()

                apiResponse = {
                    "api_status": SUCCESS_OK,
                    "status": PROFILE_CREATED,
                    "message": "profile created"
                }



        except Exception as e:
            print(e)
            apiResponse = {
                "api_status": SERVER_ERROR_INTERNAL_SERVER_ERROR,
                "status": PROFILE_NOT_CREATED,
                "message": "Oops! seems like some error occurred server"
            }


        return jsonify(apiResponse)
        


class FetchOwnerProfile(Resource):

    def post(self):
        print("********************************* in FetchOwnerProfile (post method)")

        userId = request.form.get("userId")

        # print(userId)

        apiResponse = {} # making a empty dict variable

        try:
            userExist = User.query.filter_by( user_id = userId ).first()
            profileExist = Profile.query.filter_by( user_id = userId ).first()

            print(userExist)
            print(profileExist)
            
            if userExist != None and profileExist != None:
                apiResponse = {
                    "api_status": SUCCESS_OK,
                    "status": USER_EXIST,
                    "message": "profile fetched successfully",
                    "data": {
                        "user_id": profileExist.user_id,
                        "user_name": userExist.user_name,
                        "user_actual_name": profileExist.user_actual_name,
                        "user_profile_picture": profileExist.user_profile_picture,
                        "user_bio": profileExist.user_bio,
                        "user_accout_view": profileExist.user_accout_view,
                        "user_total_post": profileExist.user_total_post,
                        "user_total_follower": profileExist.user_total_follower,
                        "user_total_following": profileExist.user_total_following
                    }
                }
            else:
                apiResponse = {
                    "api_status": SUCCESS_OK,
                    "status": USER_NOT_EXIST,
                    "message": "profile fetched failed",
                }


        except Exception as e:
            print(e)
            apiResponse = {
                "api_status": SERVER_ERROR_INTERNAL_SERVER_ERROR,
                "status": PROFILE_NOT_CREATED,
                "message": "Oops! seems like some error occurred server"
            }


        return jsonify(apiResponse)


class UpdateUserActualName(Resource):

    def post(self):
        print("********************************* in UpdateUserActualName (post method)")

        userId = request.form.get("userId")
        changedUserActualName = request.form.get("changedUserActualName")

        # print(userId)

        apiResponse = {} # making a empty dict variable

        try:
            profileExist = Profile.query.filter_by( user_id = userId ).first()
           
            # print(profileExist)
            
            if profileExist != None:
                profileExist.user_actual_name = changedUserActualName
                db.session.commit()

                apiResponse = {
                    "api_status": SUCCESS_OK,
                    "status": USER_ACTUAL_NAME_CHANGE_SUCCESS,
                    "message": "user actual name changed successfully",
                }
            else:
                apiResponse = {
                    "api_status": SUCCESS_OK,
                    "status": USER_NOT_EXIST,
                    "message": "user didn't exist",
                }


        except Exception as e:
            print(e)
            apiResponse = {
                "api_status": SERVER_ERROR_INTERNAL_SERVER_ERROR,
                "status": USER_ACTUAL_NAME_CHANGE_FAIL,
                "message": "Oops! seems like some error occurred server"
            }


        return jsonify(apiResponse)




class UpdateUserBio(Resource):

    def post(self):
        print("********************************* in UpdateBio (post method)")

        userId = request.form.get("userId")
        changedUserBio = request.form.get("changedUserBio")

        # print(userId)

        apiResponse = {} # making a empty dict variable

        try:
            profileExist = Profile.query.filter_by( user_id = userId ).first()
           
            # print(profileExist)
            
            if profileExist != None:
                profileExist.user_bio = changedUserBio
                db.session.commit()

                apiResponse = {
                    "api_status": SUCCESS_OK,
                    "status": USER_BIO_CHANGE_SUCCESS,
                    "message": "user bio changed successfully",
                }
            else:
                apiResponse = {
                    "api_status": SUCCESS_OK,
                    "status": USER_NOT_EXIST,
                    "message": "user didn't exist",
                }


        except Exception as e:
            print(e)
            apiResponse = {
                "api_status": SERVER_ERROR_INTERNAL_SERVER_ERROR,
                "status": USER_BIO_CHANGE_FAIL,
                "message": "Oops! seems like some error occurred server"
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

@app.route('/homePage')
def homePage():
   return render_template('home.html')


# end





api.add_resource(Signup,"/signup")
api.add_resource(Login,"/login")

api.add_resource(IsUserNameSelected,"/isUserNameSelected")

api.add_resource(CheckUserNameAvailability,"/checkUserNameAvailability")

api.add_resource(SetUserName,"/setUserName")

api.add_resource(MakeProfile,"/makeProfile")
api.add_resource(FetchOwnerProfile,"/fetchOwnerProfile")
api.add_resource(UpdateUserActualName,"/profileUpdate/userActualName")
api.add_resource(UpdateUserBio,"/profileUpdate/userBio")


if  __name__ == "__main__":
    # sayHello()
    sayImported()
    # print(Dummytable.query.all())
    app.run(debug = True)
    

    
