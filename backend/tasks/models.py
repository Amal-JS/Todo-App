from django.db import models

# Create your models here.


class Task(models.Model):

    task = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f" {self.task[:50]} , Completed : {self.completed}"
    class Meta:
        ordering = ['created',]
