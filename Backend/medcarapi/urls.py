from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from allauth.account.views import confirm_email

from rest_framework.routers import DefaultRouter

from .views import EspecialidadeListar, MedicoListar, AgendaListar, ConsultaListar, ConsultaCadastrar, ConsultarDeletar, ConsultaListarPorUm

router = DefaultRouter()
router.register(r'consultas', ConsultaListarPorUm)

urlpatterns = [
    
    path('auth/', include('rest_auth.urls')),
    path('auth/registration/', include('rest_auth.registration.urls')),
    path('medcarapi/especialidades/', EspecialidadeListar.as_view()),
    path('medcarapi/medicos/', MedicoListar.as_view()),
    path('medcarapi/agendas/', AgendaListar.as_view()),
    path('medcarapi/buscar-consulta/', ConsultaListar.as_view()),
    path('medcarapi/criar-consulta/', ConsultaCadastrar.as_view()),
    path('medcarapi/delete-consulta/<int:pk>/', ConsultarDeletar.as_view()),
    path('', include(router.urls))
]
