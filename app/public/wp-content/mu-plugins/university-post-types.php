<?php

function university_post_types(){

    //Event post type
register_post_type('event',array(
    'public'=> true,
    'show_in_rest' => true,
    'has_archive'=> true,
    'supports'=> array(
        'title','editor', 'excerpt'
    ),
    'rewrite' => array(
        'slug'=> 'events'
    ),
    'labels'=> array(
        'name'=> 'Events',
        'add_new_item'=>'Add New Event',
        'edit_item'=> 'Edit Event',
        'all_items'=>'All Events',
        'singular_name'=>'Event'
    ),
    'menu_icon' => 'dashicons-calendar-alt'
));

//Program post type
register_post_type('program',array(
    'public'=> true,
    'show_in_rest' => true,
    'has_archive'=> true,
    'supports'=> array(
        'title','editor'
    ),
    'rewrite' => array(
        'slug'=> 'programs'
    ),
    'labels'=> array(
        'name'=> 'Programs',
        'add_new_item'=>'Add New Program',
        'edit_item'=> 'Edit Program',
        'all_items'=>'All Programs',
        'singular_name'=>'Program'
    ),
    'menu_icon' => 'dashicons-awards'
));

//Professor post type
register_post_type('professor',array(
    'public'=> true,
    'show_in_rest' => true,
    'supports'=> array(
        'title','editor', 'thumbnail'
    ),
    'labels'=> array(
        'name'=> 'Professors',
        'add_new_item'=>'Add New Professor',
        'edit_item'=> 'Edit Professor',
        'all_items'=>'All Professors',
        'singular_name'=>'Professor'
    ),
    'menu_icon' => 'dashicons-welcome-learn-more'
));
}


add_action('init', 'university_post_types');


?>