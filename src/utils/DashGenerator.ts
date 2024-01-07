/* eslint-disable prettier/prettier */
// Based of https://github.com/GilgusMaximus/yt-dash-manifest-generator/blob/master/src/DashGenerator.js
import { XMLBuilder, XmlBuilderOptionsOptional } from 'fast-xml-parser';

export async function generateDashFileFromFormats(VideoFormats: VideoFormat[] | unknown[], VideoLength: number): Promise<string> {
    const generatedJSON = generateXMLJsonFromData(VideoFormats as VideoFormat[], VideoLength);
    const builder = new XMLBuilder({
        ignoreAttributes: false,
        allowBooleanAttributes: true,
        suppressBooleanAttributes: false,
        attributeNamePrefix: '_'
    } as XmlBuilderOptionsOptional);
    return builder.build(generatedJSON);
}

function generateXMLJsonFromData(VideoFormatArray: VideoFormat[], VideoLength: number): XMLJson {
    const convertJSON: XMLJson = {
        '?xml': {
            _version: '1.0',
            _encoding: 'utf-8',
            MPD: {
                _xmlns: 'urn:mpeg:dash:schema:mpd:2011',
                _profiles: 'urn:mpeg:dash:profile:full:2011',
                _minBufferTime: 'PT1.5S',
                _type: 'static',
                _mediaPresentationDuration: `PT${VideoLength}S`,
                Period: {
                    AdaptationSet: generateAdaptationSet(VideoFormatArray)
                }
            }
        }
    };
    return convertJSON;
}

function generateAdaptationSet(VideoFormatArray: VideoFormat[]): AdaptationSet[] {
    const adaptationSets: AdaptationSet[] = [];

    const mimeAudioObjs: MimeAudioObj[] = [];

    VideoFormatArray.forEach((videoFormat) => {        // the dual formats should not be used
        if (
            (videoFormat.mimeType.includes('video') && !videoFormat.videoOnly) ||
            videoFormat.mimeType.includes('application')
        ) {
            return;
        }

        const audioTrackId = videoFormat.audioTrackId;
        const mimeType = videoFormat.mimeType;

        for (let i = 0; i < mimeAudioObjs.length; i++) {
            const mimeAudioObj = mimeAudioObjs[i];

            if (mimeAudioObj.audioTrackId == audioTrackId && mimeAudioObj.mimeType == mimeType) {
                mimeAudioObj.videoFormats.push(videoFormat);
                return;
            }
        }

        mimeAudioObjs.push({
            audioTrackId,
            mimeType,
            videoFormats: [videoFormat]
        });
    });

    mimeAudioObjs.forEach((mimeAudioObj) => {
        const adapSet: AdaptationSet = {
            _id: mimeAudioObj.audioTrackId,
            _lang: mimeAudioObj.audioTrackId?.substr(0, 2),
            _mimeType: mimeAudioObj.mimeType,
            _startWithSAP: '1',
            _subsegmentAlignment: 'true',
            Representation: []
        };

        let isVideoFormat = false;

        if (mimeAudioObj.mimeType.includes('video')) {
            isVideoFormat = true;
            adapSet['_scanType'] = 'progressive';
        }

        for (let i = 0; i < mimeAudioObj.videoFormats.length; i++) {
            const videoFormat = mimeAudioObj.videoFormats[i];
            if (isVideoFormat) {
                adapSet.Representation.push(generateRepresentationVideo(videoFormat));
            } else {
                adapSet.Representation.push(generateRepresentationAudio(videoFormat));
            }
        }

        adaptationSets.push(adapSet);
    });
    return adaptationSets;
}

function generateRepresentationAudio(Format: VideoFormat): Representation {
    const representation: Representation = {
        _id: Format.itag,
        _codecs: Format.codec,
        _bandwidth: Format.bitrate,
        AudioChannelConfiguration: {
            _schemeIdUri: 'urn:mpeg:dash:23003:3:audio_channel_configuration:2011',
            _value: '2'
        },
        BaseURL: Format.url,
        SegmentBase: {
            _indexRange: `${Format.indexStart}-${Format.indexEnd}`,
            Initialization: {
                _range: `${Format.initStart}-${Format.initEnd}`
            }
        }
    };
    return representation;
}

function generateRepresentationVideo(Format: VideoFormat): Representation {
    const representation: Representation = {
        _id: Format.itag,
        _codecs: Format.codec,
        _bandwidth: Format.bitrate,
        _width: Format.width,
        _height: Format.height,
        _maxPlayoutRate: '1',
        _frameRate: Format.fps,
        BaseURL: Format.url,
        SegmentBase: {
            _indexRange: `${Format.indexStart}-${Format.indexEnd}`,
            Initialization: {
                _range: `${Format.initStart}-${Format.initEnd}`
            }
        }
    };
    return representation;
}

interface VideoFormat {
    mimeType: string;
    videoOnly: boolean;
    audioTrackId: string;
    itag: string;
    codec: string;
    bitrate: number;
    width: number;
    height: number;
    fps: number;
    url: string;
    indexStart: number;
    indexEnd: number;
    initStart: number;
    initEnd: number;
}

interface MimeAudioObj {
    audioTrackId: string;
    mimeType: string;
    videoFormats: VideoFormat[];
}

interface AdaptationSet {
    _id: string;
    _lang: string;
    _mimeType: string;
    _startWithSAP: string;
    _subsegmentAlignment: string;
    _scanType?: string;
    Representation: Representation[];
}

interface Representation {
    _id: string;
    _codecs: string;
    _bandwidth: number;
    _width?: number;
    _height?: number;
    _maxPlayoutRate?: string;
    _frameRate?: number;
    BaseURL: string;
    SegmentBase: {
        _indexRange: string;
        Initialization: {
            _range: string;
        }
    };
    AudioChannelConfiguration?: {
        _schemeIdUri: string;
        _value: string;
    }
}

interface XMLJson {
    '?xml': {
        _version: string;
        _encoding: string;
        MPD: {
            _xmlns: string;
            _profiles: string;
            _minBufferTime: string;
            _type: string;
            _mediaPresentationDuration: string;
            Period: {
                AdaptationSet: AdaptationSet[];
            }
        }
    }
}