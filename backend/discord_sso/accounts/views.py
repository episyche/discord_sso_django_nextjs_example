from django.shortcuts import render
from accounts.serializer import *

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny


@permission_classes((AllowAny, ))
class DiscordSocialAuthView(GenericAPIView):
    serializer_class = DiscordAuthSerializer

    def post(self, request):
        """
        POST with "auth_token"

        Send an accesstoken as from discord to get user information

        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = ((serializer.validated_data)['auth_token'])
        print('>>>>>>>>>>>>>>>>>>>>>>>>>' , data)
        return Response(data, status=status.HTTP_200_OK)