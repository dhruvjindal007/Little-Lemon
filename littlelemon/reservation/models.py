from django.db import models
import datetime

class Booking(models.Model):
    date = models.DateField()
    time = models.TimeField(default=datetime.time(12, 0))
    guests = models.IntegerField()
    occasion = models.CharField(max_length=200,default="Casual")

    def __str__(self):
        return f"{self.date} at {self.time} for {self.guests} guest(s) - {self.occasion}"


class Menu(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    inventory = models.IntegerField()

    def __str__(self):
        return self.title

class MenuItem(models.Model):
    title=models.CharField(max_length=255)
    price=models.DecimalField(max_digits=10, decimal_places=2)
    inventory=models.IntegerField()
    def get_item(self):
        return f'{self.title}:{str(self.price)}'