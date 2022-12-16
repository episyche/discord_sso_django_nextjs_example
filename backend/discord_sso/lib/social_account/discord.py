import requests

class Discord:
    """
    Discord class to fetch the user info and return it
    """
    @staticmethod
    def validate(auth_token):
        """
        validate method Queries the discord url to fetch the user info
        """
        try:
            access_token = auth_token
            headers = {'Authorization': 'Bearer %s' %access_token }
            resp = requests.get('https://discord.com/api/v6/users/@me' , headers=headers)   
            user_info = resp.json()
            return user_info
        except:
            return "The token is either invalid or has expired"

  