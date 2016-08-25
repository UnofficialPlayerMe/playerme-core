function logLibrary(name, library){
    console.groupCollapsed(name);

    if (typeof library === 'object') {
        for (var entryName in library) {
            if (!library.hasOwnProperty(entryName)) continue;
            var entity = library[entryName];
            try {
                console.log(entryName, new entity);
            } catch (e) {
                console.log(entryName, typeof entity, entity);
            }
        }
    }else{
        console.log(library);
    }
    console.groupEnd();
}

if (typeof module != 'undefined') {
    module.exports = logLibrary;
}