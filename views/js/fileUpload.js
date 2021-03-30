FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
)

// Filepond.setOptions({
//     stylePanelAspectRatio:200/200,
//     imageResizeTargetWidth:200,
//     imageResizeTargetHeight:200
// })

FilePond.parse(document.body);
