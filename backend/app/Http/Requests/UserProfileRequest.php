<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'username' => 'nullable|unique:users,username',
            'firstName' => 'nullable',
            'lastName' => 'nullable',
            'email' => 'nullable|unique:users,email',
            'password' => 'nullable|min:8',
            'c_password' => 'nullable|same:password',
        ];
    }
}
