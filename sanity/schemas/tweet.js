export default {
  name: 'tweet',
  title: 'tweet',
  type: 'document',
  fields: [
    {
      name: 'test',
      title: 'text in a tweet',
      type: 'string',
    },
    {
      name: 'blockTweet',
      title: 'Block Tweet',
      description:"Admin control Toggle if Tweet deemed inaproprate",
      type: 'boolean',
      
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
      
    },
    {
      name: 'profileImg',
      title: 'Profile Image',
      type: 'string',
      
    },
    {
      name: 'image',
      title: 'Tweet Image',
      type: 'string',
      
    },
    
    
  ],

 
}
