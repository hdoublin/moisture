export default {
    defaultPath: '/',
    basename: '', // only at build time to set, like /datta-able
    defaultWriteInfo: {
        title: "Untitled Part",
        prompt: "",
        description: "",
        coverVideo: "",
        isVideo: false,
        coverImage: "",
        isImage: false
    },
    communities: ["Community One", "Community Two", "Community Three"],
    communitySlugs: ["community-one", "community-two", "community-three"],
    languages: ["English", "Spanish", "French", "German", "Chinese", "Japanese"],
    targetAudiences: ["45-55", "56-60"],
    copyrights: ["All Rights Reserved", "Public Domain"],
    auth: {
        default: {
            password: "password",
        },
        provider: {
            email: 'EMAIL',
            google: 'GOOGLE',
            facebook: 'FACEBOOK'
        }
    },
    entityType: {
        image: 'IMAGE',
        video: 'VIDEO',
        audio: 'AUDIO',
        emoji: 'EMOJI'
    },
    uploadMaxSize: {
        video: 10000000, // bytes
        image: 5000000, // bytes
        audio: 8000000, // bytes
    },
    social: {
        google: {
            clientId: "googleClientId",
            clientSecret: "googleSecret"
        },
        facebook: {
            appId: "appId",
            secret: "appSecret"
        }
    },
    query: {
        limit: 10,
    },
};