# Generated by Django 2.2.9 on 2020-03-03 19:54

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('places', '0004_comment_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='place',
            name='location',
            field=django.contrib.gis.db.models.fields.PointField(null=True, srid=4326),
        ),
    ]