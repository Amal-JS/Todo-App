
from django.contrib import admin
from django.urls import include, path
from tasks import views
from rest_framework import routers

#router objects handles the routing 
#router generate the urls for the viewset 
#base name to avoid conflicts when have more routers tasks/  ==== tasks-todo

router=routers.DefaultRouter()
router.register('tasks',views.TaskViewSets,basename='tasks-todo') 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include(router.urls))
]
