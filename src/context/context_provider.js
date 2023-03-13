import { CookiesProvider } from 'react-cookie';

import { AxiosContextProvider } from './axios_context';
import { AuthContextProvider } from './auth_context';
import { ServiceContextProvider } from './service_context';
import { StoryContextProvider } from './story_context';
import { UserContextProvider } from './user_context';
import { CategoryContextProvider } from './category_context';
import { SearchContextProvider } from './search_context';
import { CommentContextProvider } from './comment_context';

const ContextProvider = (props) => {
    return (

        <CookiesProvider>
            <AuthContextProvider>
                <AxiosContextProvider>
                    <SearchContextProvider>
                        <CategoryContextProvider>
                            <UserContextProvider>
                                <ServiceContextProvider>
                                    <StoryContextProvider>
                                        <CommentContextProvider>
                                            {props.children}
                                        </CommentContextProvider>                                            
                                    </StoryContextProvider>
                                </ServiceContextProvider>
                            </UserContextProvider>
                        </CategoryContextProvider>
                    </SearchContextProvider>
                </AxiosContextProvider>
            </AuthContextProvider>
        </CookiesProvider>
    );
}

export default ContextProvider;