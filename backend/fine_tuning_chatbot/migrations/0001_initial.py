# Generated by Django 4.2.4 on 2023-09-05 13:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FineTunedModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('model_name', models.CharField(max_length=100)),
                ('base_model', models.CharField(choices=[('ada', 'Ada'), ('babbage', 'Babbage'), ('curie', 'Curie'), ('davinci', 'Davinci')], max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='TrainingData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prompt', models.TextField()),
                ('completion', models.TextField()),
                ('fine_tuned_model', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='traning_data', to='fine_tuning_chatbot.finetunedmodel')),
            ],
        ),
    ]
