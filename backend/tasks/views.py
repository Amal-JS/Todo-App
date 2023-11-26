
from django.shortcuts import render
from . models import Task
from . serializers import TaskSerializer
from rest_framework import viewsets 
from rest_framework.response import Response


#model view set 
#CRUD - create , retrieve update partial update and destroy
# when returning all objects queryset will be send back in serialized form

class TaskViewSets(viewsets.ModelViewSet):
    # return all objects
    queryset = Task.objects.all()  # Replace Task with your actual model
    serializer_class = TaskSerializer

    #post
    def create(self,request):

        serializer = TaskSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
       
            msg='Data saved'
            return Response({'msg':msg})
        return Response(serializer.errors,status=400)
    
    #get a specafic task - get
    def retrieve(self,request,pk=None):
            
            if pk is not None:
                  
                  try:
                    queryset = Task.objects.get(pk=pk)
                    serializer = self.get_serializer(queryset)
                  except Task.DoesNotExist:
                        return Response({'msg':'Provide a valid id'})
                  return Response(serializer.data)
            
          
    #update the specafic task - put
    def update(self,request,pk=None):

        instance = Task.objects.get(pk=pk)
        serializer = TaskSerializer(instance = instance ,data = request.data)
        
        if serializer.is_valid():
            serializer.save()
            
            msg='Data updated'
            return Response({'msg':msg})
        return Response(serializer.errors,status=400)
        
    
    #delete
    def destroy(self,request,pk=None):
            
        if pk is not None:
                  
                  try:
                    task = Task.objects.get(pk=pk)
                    task.delete()
                  except Task.DoesNotExist:
                        return Response({'msg':'Provide a valid id'})
                  return Response({'msg':'Deleted Successfully'}) 