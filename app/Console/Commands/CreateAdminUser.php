<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateAdminUser extends Command
{
    protected $signature = 'admin:ensure {--email= : Admin email} {--name= : Admin display name} {--password= : Admin password}';

    protected $description = 'Create or promote an administrator account from options or environment configuration';

    public function handle(): int
    {
        $email = $this->option('email') ?: config('auth.admin.email');
        $name = $this->option('name') ?: config('auth.admin.name', 'Admin');
        $password = $this->option('password') ?: config('auth.admin.password');

        if (empty($email) || empty($password)) {
            $this->error('Both email (ADMIN_EMAIL / --email) and password (ADMIN_PASSWORD / --password) are required.');

            return self::FAILURE;
        }

        $user = User::updateOrCreate(
            ['email' => strtolower(trim($email))],
            [
                'name' => $name,
                'password' => Hash::make($password),
                'email_verified_at' => now(),
            ]
        );

        $user->is_admin = true;
        $user->save();

        $this->info("Admin user ensured: {$user->email}");

        return self::SUCCESS;
    }
}

