/**
 * @preserve Copyright (c) 2015 British Broadcasting Corporation
 * (http://www.bbc.co.uk) and TAL Contributors (1)
 *
 * (1) TAL Contributors are listed in the AUTHORS file and at
 *     https://github.com/fmtvp/TAL/AUTHORS - please extend this file,
 *     not this notice.
 *
 * @license Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * All rights reserved
 * Please contact us for an alternative licence
 */

(function() {

    this.HTML5NoEnterBufferingSentinelTests = AsyncTestCase("HTML5NoEnterBufferingSentinelMediaPlayer");

    var config = {"modules":{"base":"antie/devices/browserdevice","modifiers":["antie/devices/mediaplayer/html5noenterbufferingsentinel"]}, "input":{"map":{}},"layouts":[{"width":960,"height":540,"module":"fixtures/layouts/default","classes":["browserdevice540p"]}],"deviceConfigurationKey":"devices-html5-1"};

    // ---------------
    // Mix in the base HTML5 tests to make sure the sub-modifier doesn't break basic functionality
    // ---------------
    window.commonTests.mediaPlayer.html5.mixinTests(this.HTML5NoEnterBufferingSentinelTests, "antie/devices/mediaplayer/html5noenterbufferingsentinel", config);

    // ---------------
    // Remove tests that are irrelevant for this sub-modifier.
    // ---------------

    delete this.HTML5NoEnterBufferingSentinelTests.prototype.testEnterBufferingSentinelCausesTransitionToBufferingWhenPlaybackHaltsForMoreThanOneSentinelIterationSinceStateChanged;
    // ---------------
    // Additional tests for this sub-modifier.
    // ---------------

    // Sentinels
    this.HTML5NoEnterBufferingSentinelTests.prototype.testEnterBufferingSentinelIsNotFired = function(queue) {
        expectAsserts(3);
        this.runMediaPlayerTest(this, queue, function (MediaPlayer) {
            this.getToPlaying(this, MediaPlayer);
            this.advancePlayTime(this);
            this.advancePlayTime(this);

            this.clearEvents(this);
            this.fireSentinels(this);
            this.fireSentinels(this);

            this.assertNoEvent(this, MediaPlayer.EVENT.SENTINEL_ENTER_BUFFERING);
            this.assertNoEvent(this, MediaPlayer.EVENT.BUFFERING);
            this.assertState(this, MediaPlayer.STATE.PLAYING);
        });
    };
})();
