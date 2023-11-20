
from django.shortcuts import render
from . models import Task
from . serializers import TaskSerializer
from rest_framework import viewsets 
from rest_framework.response import Response


class TaskViewSets(viewsets.ModelViewSet):
    queryset = Task.objects.all()  # Replace Task with your actual model
    serializer_class = TaskSerializer


    def create(self,request):

        print(request, request.data)
        serializer = TaskSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
       
            msg='Data saved'
            return Response({'msg':msg})
        return Response(serializer.errors,status=400)
    
    def retrieve(self,request,pk=None):
            
            if pk is not None:
                  
                  try:
                    queryset = Task.objects.get(pk=pk)
                    serializer = self.get_serializer(queryset)
                  except Task.DoesNotExist:
                        return Response({'msg':'Provide a valid id'})
                  return Response(serializer.data)
            
            # queryset = self.get_queryset()
            # serializer = self.get_serializer(queryset, many=True)
            # print(serializer,'  -----   ',serializer.data)
            # return Response(serializer.data)
    

    def update(self,request,pk=None):

        instance = Task.objects.get(pk=pk)
        serializer = TaskSerializer(instance = instance ,data = request.data)
        print(instance)
        print('-------------',request.data)
        if serializer.is_valid():
            serializer.save()
            
            msg='Data updated'
            return Response({'msg':msg})
        return Response(serializer.errors,status=400)
        
    

    def partial_update(self,request,pk=None):
            return Response({'msg':'Response from partial_update method'})
    def destroy(self,request,pk=None):
            
        if pk is not None:
                  
                  try:
                    task = Task.objects.get(pk=pk)
                    task.delete()
                  except Task.DoesNotExist:
                        return Response({'msg':'Provide a valid id'})
                  return Response({'msg':'Deleted Successfully'}) 