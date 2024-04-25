# Generated by Django 4.2.11 on 2024-04-18 07:10

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("placesinfo", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="placeinfo",
            name="written",
            field=models.ManyToManyField(
                related_name="written_place", to=settings.AUTH_USER_MODEL
            ),
        ),
    ]