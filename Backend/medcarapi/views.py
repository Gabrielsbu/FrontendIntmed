from .models import Especialidade, Medico, Agenda, Consulta
from .serializers import EspecialidadeSerializer, MedicoSerializer, AgendaSerializer, ConsultaSerializer
import json
import datetime
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse

class EspecialidadeListar(APIView):
    """
    Busca todas as especialidades existentes no banco de dados

    #Parameters:
        request (WSGIRequest): Objeto de tipo WSGIRequest que representa a solicitação feita pelo usuário,
        passando informações necessárias para buscar a lista de Especialidades
        self: EspecialidadeListar: Representa a minha classe EspecialidadeListar.
    #Returns:
        response (JSON Response): A resposta é em formato Json, com todas as informações da lista de Objetos do tipo Especialidade.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = Especialidade.objects.all()
        serializer = EspecialidadeSerializer(queryset, many=True)
        return Response(serializer.data)


class MedicoListar(APIView):
    """
    Busca todos os médicos existentes no banco de dados.

    #Parameters:
        request (WSGIRequest): Objeto de tipo WSGIRequest que representa a solicitação feita pelo usuário,
        passando informações necessárias para buscar a lista de Médicos
        self: MedicoListar: Representa a minha classe MedicoListar.

    #Returns:
        response (JSON Response): A resposta é em formato Json, com todas as informações da lista de Objetos do tipo Médico.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = Medico.objects.all()
        serializer = MedicoSerializer(queryset, many=True)
        return Response(serializer.data)


class AgendaListar(APIView):
    """
    Busca todas as agendas existentes no banco de dados.

    #Parameters:
        request (WSGIRequest): Objeto de tipo WSGIRequest que representa a solicitação feita pelo usuário,
        passando informações necessárias para buscar a lista de Agendas
        self: AgendaListar: Representa a minha classe AgendaListar.

    #Returns:
        response (JSON Response): A resposta é em formato Json, com todas as informações da lista de Objetos do tipo Médico.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        hoje = datetime.date.today()
        #hora = datetime.time(hour=datetime.datetime.utcnow().hour, minute=datetime.datetime.utcnow().minute)

        agenda_list = Agenda.objects.filter(dia__gte=hoje).order_by("dia").all()
        consulta_list = Consulta.objects.filter(dia__gte=hoje).all()

        for agenda in agenda_list:
            for consulta in consulta_list:
                if consulta.medico == agenda.medico and consulta.dia == agenda.dia:
                    if consulta.horario in agenda.horarios:
                        agenda.horarios.remove(consulta.horario)
            if len(agenda.horarios) == 0:
                agenda_list = agenda_list.exclude(id=agenda.id)

        serializer = AgendaSerializer(agenda_list, many=True)
        return Response(serializer.data)


class ConsultaListar(APIView):
    """
    Busca todos as consultas existentes no banco de dados.

    #Parameters:
        request (WSGIRequest): Objeto de tipo WSGIRequest que representa a solicitação feita pelo usuário,
        passando informações necessárias para buscar a lista de Médicos
        self: ConsultaListar: Representa a minha classe ConsultaListar.

    #Returns:
        response (JSON Response): A resposta é em formato Json, com todas as informações da lista de Objetos do tipo Médico.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user.id
        hoje = datetime.date.today()
        consultas = Consulta.objects.filter(usuario_id=user, dia__gte=hoje).order_by("dia", "horario").all()

        serializer = ConsultaSerializer(consultas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ConsultaListarPorUm(viewsets.ModelViewSet):
    """
    Busca apenas uma agenda através do ID presente no banco de dados. Utilizando para detalhar consulta na versão Mobile

    #Returns:
        response (JSON Response): A resposta é em formato Json, com todas as informações do Objetos do tipo Consulta.
    """
    permission_classes = [IsAuthenticated]

    queryset = Consulta.objects.all()
    serializer_class = ConsultaSerializer


class ConsultaCadastrar(APIView):
    """
        Cadastra uma consulta no banco de dados.

        #Parameters:
            request (WSGIRequest): Objeto de tipo WSGIRequest que representa a solicitação feita pelo usuário,
            passando informações necessárias para criar o objeto e o usuário que criou aquele objeto do tipo Consulta.
            self: ConsultaCadastrar: Representa a minha classe ConsultaCadastrar.


        #Returns:
            response (JSON Response): A resposta é em formato Json, com todas as informações da consulta criada.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):

        payload = json.loads(request.body)
        user = request.user
        hoje = datetime.date.today()

        try:
            agenda = Agenda.objects.get(id=payload["agenda"], dia__gte=hoje)

            consulta = Consulta.objects.create(
                usuario_id=user.id,
                dia=agenda.dia,
                horario=payload['horario'],
                medico=agenda.medico
            )

            serializer = ConsultaSerializer(consulta)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except ObjectDoesNotExist as e:
            return JsonResponse({'error': 'Você não pode cadastrar em uma data que não existe'}, safe=False,
                                status=status.HTTP_404_NOT_FOUND)
        except Exception:
            return JsonResponse({'error': 'Algo de muito grave aconteceu'}, safe=False,
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ConsultarDeletar(APIView):
    """
    Deleta uma consulta existente.

    #Parâmetros:
        request (WSGIRequest, pk: Primary key): É um objeto do tipo WSGIRequest
        que pega a solicitação feita por um usuário e passa informações necessárias para excluir minha consulta
        self: ConsultaDeletar: Representa a minha classe ConsultarDeletar.
        pk: Representa a chave primária do meu objeto para ser deletado.

    #Returns:
        No body returned for response.
    """

    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        user = request.user.id
        hoje = datetime.date.today()
        # hora = datetime.time(hour=datetime.datetime().hour, minute=datetime.datetime().minute)

        try:
            consult = Consulta.objects.get(usuario_id=user, pk=pk, dia__gte=hoje)
            consult.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist as e:
            return JsonResponse({'error': 'Essa consulta não existe'}, safe=False,
                                status=status.HTTP_404_NOT_FOUND)
        except Exception:
            return JsonResponse({'error': 'Algo de muito ruim deu errado'}, safe=False,
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
