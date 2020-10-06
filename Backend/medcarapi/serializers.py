from rest_framework import serializers
from .models import Especialidade, Medico, Agenda, Consulta


class EspecialidadeSerializer(serializers.ModelSerializer):
    """
    O serializer da Especialidade é responsável por transformar o meu Model em um dicionário Json
    para ser possível mapear as respostas.
    """

    class Meta:
        model = Especialidade
        fields = '__all__'


class MedicoSerializer(serializers.ModelSerializer):
    """
    O serializer do Médico é responsável por transformar o meu Model em um dicionário Json
    para ser possível mapear as respostas.
    """

    especialidade = EspecialidadeSerializer(many=False, read_only=True)

    class Meta:
        model = Medico
        fields = 'id', 'nome', 'CRM', 'especialidade'


class AgendaSerializer(serializers.ModelSerializer):
    """
    O serializer da Agenda é responsável por transformar o meu Model em um dicionário Json
    para ser possível mapear as respostas.
    """

    medico = MedicoSerializer(many=False, read_only=True)

    class Meta:
        model = Agenda
        fields = 'id', 'medico', 'dia', 'horarios'


class ConsultaSerializer(serializers.ModelSerializer):
    """
    O serializer da Consulta é responsável por transformar o meu Model em um dicionário Json
    para ser possível mapear as respostas.
    """
    medico = MedicoSerializer(many=False, read_only=True)

    class Meta:
        model = Consulta
        fields = 'id', 'dia', 'horario', 'data_agendamento', 'medico'
