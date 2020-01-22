---
title: Authentication vs Authentication
author: Chaduvula Prasanth
date: 2020-01-21
hero: ./images/auth.png
excerpt: Learn what is Authentication, Authentication and difference between them
---

# Authentication vs Authorization

Authentication and authorization used for protecting applications
authentication is the process of verifying who a user is and authorization is the process of verifying what they have access to

## Authentication

- Authentication is about validating your credentials such as Username/User ID and password to verify your identity. The system then checks whether your credentials are valid or not. Whether in public or private networks, the system authenticates the user identity through login passwords. Usually authentication is done by a username and password, although there are other various ways to be authenticated like single factor authentication, two factor authentication and multi factor authentication
- Authentication will be done before authorization
- Generally, transmits info through an ID Token
- example: you login to facebook for joining any of the groups by providing your phone number or email & password

## Authorization

- Determine whether the authenticated user has access to the particular and usually done after successful authentication
- Generally, transmits info through an Access Token
- example: As you are member in facebook group, to change the group info you should have authorization to update the group info ( group admin have special authorization)

In short, access to a resource is protected by both authentication and authorization. If you can't prove your identity, you won't be allowed into a resource. And even if you can prove your identity, if you are not authorized for that resource, you will still be denied access.
