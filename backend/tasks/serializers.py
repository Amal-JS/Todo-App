from rest_framework import serializers
from . models import Task

#except the field created all fields will the serializer class
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        exclude = ('created',)