from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib import messages
from .models import Contact

def home(request):
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        
        if name and email and message:
            Contact.objects.create(name=name, email=email, message=message)
            
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({'success': True, 'message': 'Transmission successful. Data stored in database.'})
                
            messages.success(request, 'Your transmission has been received.')
            return redirect('/#contact')
            
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse({'success': False, 'message': 'Invalid data provided.'})
            
    return render(request, 'index.html')
