
from django.contrib import admin
from django.urls import include, path
from tasks import views
from rest_framework import routers

router=routers.DefaultRouter()
router.register('tasks',views.TaskViewSets,basename='tasks') 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include(router.urls))
]
