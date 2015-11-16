'use strict';

/**
 * @ngdoc service
 * @name codessesApp.getUser
 * @description
 * # getUser
 * Service in the codessesApp.
 */
angular.module('app')
  .service('getUser', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.byId = function(user) {
        var provider = user.provider,
            obj = user[provider],
            data = obj.cachedUserProfile,
            profile;
        if (provider.toLowerCase() === 'twitter') {
            profile = {
                'provider': provider,
                'nick': obj.displayName,
                'email': data.email || '',
                'name': data.name,
                'username': data.screen_name,
                'address' : data.location,
                'picture': data.profile_image_url,
                'gender': data.gender || ''
            }
        } else if (provider.toLowerCase() === 'facebook') {
            profile = {
                'provider': provider,
                'nick': data.first_name,
                'email': data.email || '',
                'name': data.name,
                'username': data.id,
                'address' : data.location,
                'picture': data.picture.data.url,
                'gender': data.gender || ''
            }

        } else if (provider.toLowerCase() === 'google') {
            profile = {
                'provider': provider,
                'nick': data.given_name,
                'email': data.email || '',
                'name': data.name,
                'username': data.id,
                'address' : data.location || '',
                'picture': data.picture,
                'gender': data.gender || ''
            }

        } else if (provider.toLowerCase() === 'github') {
            profile = {
                'provider': provider,
                'nick': obj.username,
                'email': obj.email || '',
                'name': data.name,
                'username': obj.username,
                'address' : data.location || '',
                'picture': obj.profileImageURL,
                'gender': data.gender || '',
                'company': data.company || '',
                'blog': data.blog || '',
                'bio': data.bio || '',
            }

        } else {
            return 'Invalid User data';
        };
        profile.group = 'codesses';
        return profile;
    }

  });
