from django import forms
from .models import Project, Skill, Profile

class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = ['title', 'description', 'tech_stack', 'image', 'github_link', 'live_demo']

class SkillForm(forms.ModelForm):
    class Meta:
        model = Skill
        fields = ['name', 'category']

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['name', 'bio', 'resume', 'github_link', 'linkedin_link']
