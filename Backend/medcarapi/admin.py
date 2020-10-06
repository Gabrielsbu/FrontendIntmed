from django.contrib import admin
from django import forms
import datetime

# Você deve registrar seus modelos aqui.
from .models import Especialidade, Medico, Agenda

admin.site.register(Especialidade)
admin.site.register(Medico)

class AgendaRestricoes(forms.ModelForm):
    """
    Representa a restrição do formulário em agenda na Interface Administrativa.
    """

    class Meta:
        model = Agenda
        fields = '__all__'

    def clean_dia(self):

        """
        Valida o campo dia, com relação a criação de agendas, não é possível cadastrar agenda para um dia que já passou
        e não é possível cadastrar mais de uma agenda pro mesmo médico no mesmo dia.
        """

        hoje = datetime.date.today()
        pegarData = self.cleaned_data.get('dia')
        pegarMedico = self.cleaned_data.get('medico')

        pegarAgenda = Agenda.objects.filter(dia=pegarData, medico=pegarMedico)

        if (pegarData < hoje):
            raise forms.ValidationError(
                "Não é possível criar uma agenda para um médico em um dia passado")

        if (pegarAgenda):
            raise forms.ValidationError(
                "Não é possível criar mais de uma agenda para um médico em um mesmo dia")
        return self.cleaned_data['dia']


class AgendaControllAdmin(admin.ModelAdmin):
    """
    Instancializa o formulário na ordem dos campos a seguir.
    """
    form = AgendaRestricoes
    list_display = ('medico', 'dia', 'horarios')


admin.site.register(Agenda, AgendaControllAdmin)
