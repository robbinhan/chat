<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => str_random(10),
            'email' => str_random(10).'@kingnet.com',
            'real_name' => str_random(10),
            'password' => bcrypt('secret'),
        ]);

        dd(DB::table('users')->all());
    }
}
