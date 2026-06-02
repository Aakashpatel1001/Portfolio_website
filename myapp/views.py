from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib import messages
from .models import ContactMessage

def home(request):
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        
        if name and email and message:
            ContactMessage.objects.create(name=name, email=email, message=message)
            
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({'success': True, 'message': 'Message sent successfully! I will get back to you soon.'})
                
            messages.success(request, 'Your transmission has been received.')
            return redirect('/#contact')
            
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse({'success': False, 'message': 'Invalid data provided.'})
            
    # Fetch DB data for frontend
    from .models import Project, Skill, Profile
    projects = Project.objects.all().order_by('-created_at')
    skills = Skill.objects.all().order_by('category')
    profile = Profile.objects.first()

    context = {
        'projects': projects,
        'skills': skills,
        'profile': profile
    }
    
    return render(request, 'index.html', context)

# --- Custom Admin Dashboard Views ---
from django.contrib.auth.decorators import login_required, user_passes_test
from django.shortcuts import get_object_or_404
from .models import Project, Skill, Profile
from .forms import ProjectForm, SkillForm, ProfileForm

def is_admin(user):
    return user.is_superuser

@login_required(login_url='/admin/login/')
@user_passes_test(is_admin, login_url='/admin/login/')
def dashboard_index(request):
    context = {
        'total_projects': Project.objects.count(),
        'total_skills': Skill.objects.count(),
        'total_messages': ContactMessage.objects.count(),
    }
    return render(request, 'dashboard/index.html', context)

# --- Projects ---
@login_required(login_url='/admin/login/')
@user_passes_test(is_admin)
def project_list(request):
    query = request.GET.get('q', '')
    if query:
        projects = Project.objects.filter(title__icontains=query).order_by('-created_at')
    else:
        projects = Project.objects.all().order_by('-created_at')
    return render(request, 'dashboard/project_list.html', {'projects': projects, 'query': query})

@login_required(login_url='/admin/login/')
@user_passes_test(is_admin)
def project_create(request):
    if request.method == 'POST':
        form = ProjectForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Project added successfully.')
            return redirect('dashboard_projects')
    else:
        form = ProjectForm()
    return render(request, 'dashboard/project_form.html', {'form': form, 'title': 'Add Project'})

@login_required(login_url='/admin/login/')
@user_passes_test(is_admin)
def project_update(request, pk):
    project = get_object_or_404(Project, pk=pk)
    if request.method == 'POST':
        form = ProjectForm(request.POST, request.FILES, instance=project)
        if form.is_valid():
            form.save()
            messages.success(request, 'Project updated successfully.')
            return redirect('dashboard_projects')
    else:
        form = ProjectForm(instance=project)
    return render(request, 'dashboard/project_form.html', {'form': form, 'title': 'Edit Project'})

@login_required(login_url='/admin/login/')
@user_passes_test(is_admin)
def project_delete(request, pk):
    project = get_object_or_404(Project, pk=pk)
    project.delete()
    messages.success(request, 'Project deleted successfully.')
    return redirect('dashboard_projects')

# --- Skills ---
@login_required(login_url='/admin/login/')
@user_passes_test(is_admin)
def skill_list(request):
    skills = Skill.objects.all().order_by('category')
    return render(request, 'dashboard/skill_list.html', {'skills': skills})

@login_required(login_url='/admin/login/')
@user_passes_test(is_admin)
def skill_create(request):
    if request.method == 'POST':
        form = SkillForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Skill added successfully.')
            return redirect('dashboard_skills')
    else:
        form = SkillForm()
    return render(request, 'dashboard/skill_form.html', {'form': form, 'title': 'Add Skill'})

@login_required(login_url='/admin/login/')
@user_passes_test(is_admin)
def skill_delete(request, pk):
    skill = get_object_or_404(Skill, pk=pk)
    skill.delete()
    messages.success(request, 'Skill deleted successfully.')
    return redirect('dashboard_skills')

# --- Messages ---
@login_required(login_url='/admin/login/')
@user_passes_test(is_admin)
def message_list(request):
    msgs = ContactMessage.objects.all().order_by('-created_at')
    return render(request, 'dashboard/message_list.html', {'messages': msgs})

@login_required(login_url='/admin/login/')
@user_passes_test(is_admin)
def message_delete(request, pk):
    msg = get_object_or_404(ContactMessage, pk=pk)
    msg.delete()
    messages.success(request, 'Message deleted successfully.')
    return redirect('dashboard_messages')

# --- Profile ---
@login_required(login_url='/admin/login/')
@user_passes_test(is_admin)
def profile_update(request):
    profile = Profile.objects.first()
    if request.method == 'POST':
        form = ProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile updated successfully.')
            return redirect('dashboard_index')
    else:
        form = ProfileForm(instance=profile)
    return render(request, 'dashboard/profile_form.html', {'form': form, 'title': 'Update Profile'})

