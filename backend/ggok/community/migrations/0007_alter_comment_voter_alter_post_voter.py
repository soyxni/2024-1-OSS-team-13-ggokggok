# Generated by Django 5.0.3 on 2024-04-15 07:46

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0006_remove_question_author_remove_question_voter_post_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='voter',
            field=models.ManyToManyField(default=0, null=True, related_name='answer_voter', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='post',
            name='voter',
            field=models.ManyToManyField(default=0, null=True, related_name='post_voter', to=settings.AUTH_USER_MODEL),
        ),
    ]