# Generated by Django 4.1.7 on 2023-04-09 19:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("leaderboard", "0002_record_time"),
    ]

    operations = [
        migrations.AddField(
            model_name="record",
            name="guess1",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="record",
            name="guess2",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="record",
            name="guess3",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="record",
            name="guess4",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="record",
            name="guess5",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="record",
            name="guess6",
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
