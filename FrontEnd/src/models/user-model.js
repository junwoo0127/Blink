class UserModel {
  connectionId;
  audioActive;
  videoActive;
  screenShareActive;
  nickname;
  streamManager;
  type; // 'remote' | 'local'
  role;
  playerSeq;
  answer;
  sequence;
  gender;
  mbti;

  constructor() {
    this.connectionId = "";
    this.audioActive = true;
    this.videoActive = true;
    this.screenShareActive = false;
    this.nickname = "";
    this.streamManager = null;
    this.type = "local";
    this.role = "";
    this.playerSeq = "";
    this.answer = "";
    this.sequence = "";
    this.gender = "";
    this.mbti = ";";
  }

  isAudioActive() {
    return this.audioActive;
  }

  isVideoActive() {
    return this.videoActive;
  }

  isScreenShareActive() {
    return this.screenShareActive;
  }
  getMbti() {
    return this.mbti;
  }
  getGender() {
    return this.gender;
  }
  getSequence() {
    return this.sequence;
  }
  getAnswer() {
    return this.answer;
  }
  getPlayerSeq() {
    return this.playerSeq;
  }
  getRole() {
    return this.role;
  }

  getConnectionId() {
    return this.connectionId;
  }

  getNickname() {
    return this.nickname;
  }

  getStreamManager() {
    return this.streamManager;
  }

  isLocal() {
    return this.type === "local";
  }
  isRemote() {
    return !this.isLocal();
  }
  setMbti(mbti) {
    this.mbti = mbti;
  }
  setGender(gender) {
    this.gender = gender;
  }
  setSequence(sequence) {
    this.sequence = sequence;
  }
  setAnswer(answer) {
    this.answer = answer;
  }
  setPlayerSeq(playerSeq) {
    this.playerSeq = playerSeq;
  }
  setRole(role) {
    this.role = role;
  }
  setAudioActive(isAudioActive) {
    this.audioActive = isAudioActive;
  }
  setVideoActive(isVideoActive) {
    this.videoActive = isVideoActive;
  }
  setScreenShareActive(isScreenShareActive) {
    this.screenShareActive = isScreenShareActive;
  }
  setStreamManager(streamManager) {
    this.streamManager = streamManager;
  }

  setConnectionId(conecctionId) {
    this.connectionId = conecctionId;
  }
  setNickname(nickname) {
    this.nickname = nickname;
  }
  setType(type) {
    if ((type === "local") | (type === "remote")) {
      this.type = type;
    }
  }
}

export default UserModel;
