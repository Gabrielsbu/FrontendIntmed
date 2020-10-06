from django.db import models
from django.contrib.postgres.fields import ArrayField


class Especialidade(models.Model):
    """
       A Especialidade se referece a uma especialidade de um Médico.
    """

    class Meta:

        db_table = 'especialidade   '

    id = models.AutoField(primary_key=True, unique=True)
    nome = models.CharField(max_length=150, null=False)


class Medico(models.Model):
    """
        O Médico se refere a um médico
    """

    class Meta:

        db_table = 'medico'

    id = models.AutoField(primary_key=True, unique=True)
    nome = models.CharField(max_length=150, null=False)
    CRM = models.IntegerField()
    email = models.EmailField(max_length=150, unique=True)
    telefone = models.CharField(max_length=150)
    especialidade = models.ForeignKey(Especialidade, on_delete=models.CASCADE)


class Agenda(models.Model):
    """
    A Agenda se refere a uma agenda de um médico específico
    """

    class Meta:
        db_table = 'agenda'

    id = models.AutoField(primary_key=True, unique=True)
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)
    dia = models.DateField(auto_now_add=False)
    horarios = ArrayField((models.TimeField(auto_now_add=False)))


class Consulta(models.Model):
    """
    A Consulta se refere a consulta de um médico em uma determinada agenda em um determinado horário
    """

    class Meta:
        db_table = 'consulta'

    id = models.AutoField(primary_key=True, unique=True)
    usuario_id = models.IntegerField()
    data_agendamento = models.DateTimeField(auto_now_add=True)
    dia = models.DateField(auto_now=False, auto_now_add=False)
    horario = models.TimeField(auto_now_add=False)
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)



