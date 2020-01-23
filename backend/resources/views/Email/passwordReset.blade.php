@component('mail::message')
# Password Change Request

Please click the button below to reset your password.

@component('mail::button', ['url' => 'http://localhost:4200/new-password?token='.$token])
Reset Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
