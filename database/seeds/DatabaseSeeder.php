<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        for ($i=0; $i < 20; $i++) { 
            DB::table('users')->insert([
                'name' => str_random(10),
                'email' => str_random(10).'@kingnet.com',
                'real_name' => str_random(10),
                'password' => bcrypt('secret'),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]);
        }

        Model::reguard();
    }
}
