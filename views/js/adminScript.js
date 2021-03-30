document.getElementById('testText').innerHTML="nothing"

FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
);


FilePond.setOptions({
    stylePanelAspectRatio: 1/2.5,
    imageResizeTargetWidth: 100,
    imageResizeTargetHeight: 150
})


FilePond.parse(document.body);