const eventModel = function () {
    
    const createEvent = function (params) {
        let data = {
            ...params,
            peopleInterestedIn: 0,
            organizer: JSON.parse(storage.getData('userInfo')).username
        };

        let url = `/appdata/${storage.appKey}/events`;
        let headers = {
            body: JSON.stringify(data),
            headers: {},
        };

        return requester.post(url, headers);
    }

    const getAllEvents = function () {
        let url = `/appdata/${storage.appKey}/events`;
        let headers = {
            headers: {},
        };

        return requester.get(url, headers);
    };

    const getEvent = function (id) {
        let url = `/appdata/${storage.appKey}/events/${id}`;
        let headers = {
            headers: {},
        };

        return requester.get(url, headers);
    }

    const editEvent = function (params) {
        const url = `/appdata/${storage.appKey}/events/${params.eventId}`;
        delete params.eventId;

        const headers = {
            body: JSON.stringify({...params}),
            headers: {}
        }

        return requester.put(url, headers);
    };

    const deleteEvent = function (id) {
        const url = `/appdata/${storage.appKey}/events/${id}`;
        const headers = {
            headers: {},
        }
        
        return requester.del(url, headers);
    }

    return {
        createEvent,
        getAllEvents,
        getEvent,
        editEvent,
        deleteEvent,
    }
}();
