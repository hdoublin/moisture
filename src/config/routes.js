import React from 'react';
import { 
    LoginPage, 
    RegisterPage, 
    HomePage, 
    NewStoryPage, 
    EditStoryPage, 
    MyStoriesPage, 
    WritePage,
    CategoryStoriesPage, 
    SearchPage,
    UserPage,
    StoryPage,
    StoryPartPage,
    ProfileEditPage,
    ProfilePasswordPage,
    ForgotPasswordPage,
    TagsStoriesPage,
} from '../intefaces/pages';

const routes = [
    { path: '', exact: true, auth: false, name: 'HomePage', component: <HomePage/> },
    { path: '/auth/login', exact: true, auth: false, name: 'LoginPage', component: <LoginPage/> },
    { path: '/auth/register', exact: true, auth: false, name: 'RegisterPage', component: <RegisterPage/> },
    { path: '/auth/forgot-password', exact: true, auth: false, name: 'ForgotPasswordPage', component: <ForgotPasswordPage/> },
    { path: '/stories/categories/:categorySlug', exact: true, auth: false, name: 'CategoryStoriesPage', component: <CategoryStoriesPage/> },
    { path: '/stories/tags/:tagsSlug', exact: true, auth: false, name: 'TagsStoriesPage', component: <TagsStoriesPage/> },
    { path: '/search/:queryText', exact: true, auth: false, name: 'SearchPage', component: <SearchPage/> },
    { path: '/users/:userId', exact: true, auth: false, name: 'UserPage', component: <UserPage/> },
    { path: '/story/:storyId', exact: true, auth: false, name: 'StoryPage', component: <StoryPage/> },
    { path: '/story/:storyId/:storyPartId', exact: true, auth: false, name: 'StoryPartPage', component: <StoryPartPage/> },

    { path: '/mystories/new', exact: true, auth: true, name: 'NewStoryPage', component: <NewStoryPage/> },
    { path: '/mystories/write/:storyPartId', exact: true, auth: true, name: 'WritePage', component: <WritePage/> },
    { path: '/mystories', exact: true, auth: true, name: 'MyStoriesPage', component: <MyStoriesPage/> },
    { path: '/mystories/:storyId', exact: true, auth: true, name: 'EditStoryPage', component: <EditStoryPage/> },
    { path: '/profile/edit', exact: true, auth: true, name: 'ProfileEditPage', component: <ProfileEditPage/> },
    { path: '/profile/change-password', exact: true, auth: true, name: 'ProfilePasswordPage', component: <ProfilePasswordPage/> },
];

export default routes;