from django.db import models

class Booking(models.Model):
    date = models.DateField()
    time = models.TimeField()
    guests = models.IntegerField()
    occasion = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.name} - {self.booking_date}"

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