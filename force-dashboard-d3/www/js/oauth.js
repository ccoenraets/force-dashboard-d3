var oauth = (function() {

    var apiVersion = "v29.0", // The version of the REST API you wish to use in your app.
        forcetkClient,
        plugin;

    function init() {

        var deferred = $.Deferred();

        plugin = cordova.require("salesforce/plugin/oauth");

        // Call getAuthCredentials to get the initial session credentials
        plugin.getAuthCredentials(
            function (creds) {
                oauthWindowCallback(creds);
                deferred.resolve();
            },
            function(error) {
                alert("Authentication Error: " + error);
                deferred.reject(error);
            });

        // Register to receive notifications when autoRefreshOnForeground refreshes the sfdc session
        document.addEventListener("salesforceSessionRefresh", salesforceSessionRefreshed, false);

        return deferred.promise();
    }

    function oauthWindowCallback(creds) {
        forcetkClient = new forcetk.Client(creds.clientId, creds.loginUrl, null, plugin.forcetkRefresh);
        forcetkClient.setSessionToken(creds.accessToken, apiVersion, creds.instanceUrl);
        forcetkClient.setRefreshToken(creds.refreshToken);
        forcetkClient.setUserAgentString(creds.userAgent);
    }

    function salesforceSessionRefreshed(creds) {
        creads = creds = creds.data;
        forcetkClient = new forcetk.Client(creds.clientId, creds.loginUrl, null, plugin.forcetkRefresh);
        forcetkClient.setSessionToken(creds.accessToken, apiVersion, creds.instanceUrl);
        forcetkClient.setRefreshToken(creds.refreshToken);
        forcetkClient.setUserAgentString(creds.userAgent);
    }

    return {
        init: init,
        getClient: function() {
            return forcetkClient;
        }
    }

}());