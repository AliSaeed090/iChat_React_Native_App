import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { Container, Content, Button, Accordion } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import io from "socket.io-client";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
// import Accordion from 'react-native-collapsible/Accordion';
import ImagePicker from "react-native-image-crop-picker";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserAction from "../redux/actions/UserAction";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// const socket = io("http://192.168.0.101:3000");
const date = new Date();
class NewsFeed extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: false,
      avatarSource: "",
      status: "",
      image: "",
      arr: [
        {
          name: "Hammad",
          img: require("../../assets/images/p.png")
        },
        {
          name: "Atique",
          img: require("../../assets/images/p1.jpeg")
        },
        {
          name: "Ali",
          img: require("../../assets/images/p7.jpeg")
        },
        {
          name: "Ali Faroq",
          img: require("../../assets/images/p6.jpg")
        },
        {
          name: "Hammad salman",
          img: require("../../assets/images/p7.jpeg")
        },
        {
          name: "Salma",
          img: require("../../assets/images/p3.jpeg")
        }
      ],
      arr1: [
        // {
        //   name: "Hammad",
        //   img: require("../../assets/images/feed.jpg"),
        //   ProfileImg: require("../../assets/images/p.png"),
        //   city: "New York , USA"
        // }
        // {
        //   name: "Atique",
        //   ProfileImg: require("../../assets/images/p1.jpeg"),
        //   img: require("../../assets/images/feed2.jpg"),
        //   city: "Lahore , Pakistan"
        // },
        // {
        //   name: "Ali",
        //   ProfileImg: require("../../assets/images/p7.jpeg"),
        //   img: require("../../assets/images/feed3.jpeg"),
        //   city: "New York , USA"
        // },
        // {
        //   name: "Ali Faroq",
        //   ProfileImg: require("../../assets/images/p6.jpg"),
        //   img: require("../../assets/images/feed4.jpg"),
        //   city: "Lahore , Pakistan"
        // },
        // {
        //   name: "Hammad salman",
        //   ProfileImg: require("../../assets/images/p7.jpeg"),
        //   img: require("../../assets/images/feed5.png"),
        //   city: "London , UK"
        // },
        // {
        //   name: "Salma",
        //   ProfileImg: require("../../assets/images/p3.jpeg"),
        //   img: require("../../assets/images/feed6.jpg"),
        //   city: "New York , USA"
        // }
      ]
    };
  }
  post = () => {
    this.newStatus = this.state.status;
    let arr1 = this.state.arr1;
    let newPost = {
      name: this.props.userName,
      img: this.state.avatarSource.uri,
      profilePicture: this.props.profilePicture,
      city: "Karachi , Pakistan",
      status: this.state.status
    };
    console.log("newPost", newPost);
    arr1.push(newPost);
    arr1.reverse();
    this.setState({
      arr1,
      isVisible: false,
      name: "",
      avatarSource: "",
      status: ""
    });

    this.props.UserAction.uploadImage(this.state.image);
  };

  takeImageFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.7
    })
      .then(image => {
        console.log("done", image);

        this.setState({
          visible: false,
          image: image,
          avatarSource: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime
          }
        });
        this.SaveImageToFirebase();
      })

      .catch(err => {
        console.log("Here error", err);
      });
  };
  SaveImageToFirebase = () => {
    console.log("userId, this.state.avatarSource.uri", this.state.avatarSource);
    this.props.UserAction.uploadProfilePic("images", this.state.image);
  };
  componentDidMount() {}
  componentWillReceiveProps(props) {
    if (props.imageUrl) {
      let post = {
        name: this.props.userName,
        img: props.imageUrl,
        profilePicture: this.props.profilePicture,
        city: "Karachi , Pakistan",
        status: this.newStatus
      };
      this.props.UserAction.sendPost(post);
      this.props.UserAction.setNull();
    }

    if (props.post) {
      let arr1 = this.state.arr1;
      console.log("worked", props.post);
      // let newPost = {
      //   name: this.props.userName,
      //   img: this.state.avatarSource.uri,
      //   ProfileImg: this.props.profilePicture,
      //   city: "Karachi , Pakistan",
      //   status: this.state.status
      // };
      // console.log("newPost", newPost);
      arr1.push(props.post);
      arr1.reverse();
      this.props.UserAction.setNull();
      this.setState({
        arr1
        // isVisible: false,
        // name: "",
        // avatarSource: "",
        // status: ""
      });
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <Modal
            isVisible={this.state.isVisible}
            onBackButtonPress={() => this.setState({ isVisible: false })}
          >
            <View
              style={{
                // flex: 1,
                height: 350,
                backgroundColor: "white",
                borderRadius: 10
              }}
            >
              <View
                style={{
                  width: "90%",
                  marginTop: 20,
                  borderWidth: 1,
                  alignSelf: "center",
                  borderRadius: 20,
                  height: 40,
                  borderColor: "#154a63",

                  paddingLeft: 10
                }}
              >
                <TextInput
                  placeholder="Say something"
                  onChangeText={text => this.setState({ status: text })}
                />
              </View>
              <TouchableOpacity
                onPress={() => this.takeImageFromLibrary()}
                style={{
                  width: "90%",
                  alignSelf: "center",
                  // height: 100,
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  padding: 10,
                  borderColor: "#154a63"
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    color: "#154a63",
                    fontWeight: "bold"
                  }}
                >
                  Add Photo
                </Text>
                {this.state.avatarSource ? (
                  <Image
                    style={{
                      width: "100%",
                      height: 200,
                      resizeMode: "contain"
                    }}
                    source={{ uri: this.state.avatarSource.uri }}
                  />
                ) : (
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: "contain",
                      tintColor: "#154a63"
                    }}
                    source={require("../../assets/images/addImage.png")}
                  />
                )}
              </TouchableOpacity>
              <View
                style={{
                  width: 100,
                  position: "absolute",
                  bottom: 20,
                  right: 20
                }}
              >
                <TouchableOpacity
                  onPress={() => this.post()}
                  style={{
                    width: "100%",
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "green",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text style={{ color: "white" }}>Post</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 100,
                  position: "absolute",
                  bottom: 20,
                  left: 20
                }}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ isVisible: false })}
                  style={{
                    width: "100%",
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "red",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text style={{ color: "white" }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* <TouchableOpacity
            onPress={() => this.setState({ isVisible: true })}
            style={{
              // width: 80,
              // height: 80,
              // borderRadius: 100,
              // backgroundColor: "orange",
              position: "absolute",
              top: 10,
              right: 40,
              zIndex: 10
            }}
          >
            <Ionicons name="md-add-circle-outline" size={90} color="#154a63" />
          </TouchableOpacity> */}

          <View style={{ width: "100%" }}>
            <View
              style={{
                width: "95%",
                //  height: 30,
                //  borderWidth: 1,
                alignSelf: "center"
              }}
            >
              <Text
                style={{ color: "black", fontWeight: "bold", fontSize: 20 }}
              >
                Stories
              </Text>
              <View
                style={{
                  flexDirection: "row"
                  // alignItems: "center",
                  // justifyContent: "center"
                }}
              >
                <Content
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {this.state.arr.map((data, index) => {
                    return (
                      <View style={{ marginTop: 20 }} key={index}>
                        <View
                          style={{
                            height: 70,
                            width: 70,
                            borderRadius: 150,
                            //  borderWidth: 1,
                            alignSelf: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: 10,
                            marginRight: 10
                          }}
                        >
                          <Image
                            style={{ height: 70, width: 70 }}
                            source={data.img}
                          />
                        </View>
                        <Text
                          style={{
                            color: "black",
                            textAlign: "center",
                            marginTop: 10,
                            fontSize: 15
                          }}
                        >
                          {data.name}
                        </Text>
                      </View>
                    );
                  })}
                </Content>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              backgroundColor: "#e2e2e2",
              height: 2
            }}
          ></View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10
            }}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "black",
                marginRight: 20
              }}
              source={{ uri: this.props.profilePicture }}
            />
            <TouchableOpacity
              onPress={() => this.setState({ isVisible: true })}
              style={{
                width: "70%",
                height: 40,
                borderWidth: 1,
                alignSelf: "center",
                borderRadius: 50,

                borderColor: "gray",
                elevation: 2,
                backgroundColor: "white",
                // alignItems: "center",
                justifyContent: "center",
                paddingLeft: 10
              }}
            >
              <Text style={{ color: "gray", fontSize: 15 }}>
                Say something...
              </Text>
            </TouchableOpacity>
          </View>

          {/* <View style={{ width: "100%", height: 100, borderWidth: 1 }}></View> */}
          {this.state.arr1.map((data, index) => {
            return (
              <View
                key={index}
                style={{
                  width: "95%",
                  alignSelf: "center",
                  // borderWidth: 1,
                  // height: 200,
                  marginTop: 10
                }}
              >
                <View
                  style={{
                    width: "100%",
                    alignSelf: "center",
                    // borderWidth: 1,
                    //  height: 120,
                    flexDirection: "row"
                  }}
                >
                  <View
                    style={{
                      width: "85%",
                      alignSelf: "center",
                      //  borderWidth: 1,
                      //  height: 20,
                      flexDirection: "row"
                    }}
                  >
                    <Image
                      style={{ height: 70, width: 70, borderRadius: 100 }}
                      source={{ uri: data.profilePicture }}
                    />
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 20
                        }}
                      >
                        {data.name}
                      </Text>
                      <Text
                        style={{
                          color: "gray",
                          fontSize: 15
                        }}
                      >
                        {data.city}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: "gray",
                      fontSize: 15,
                      marginTop: 10
                    }}
                  >
                    {"Today"}
                  </Text>
                </View>
                <View style={{ width: "95%", alignSelf: "center" }}>
                  <Text style={{ color: "black", fontSize: 15, marginTop: 5 }}>
                    {data.status}
                  </Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    alignSelf: "center",
                    //  borderWidth: 1,
                    marginTop: 10
                  }}
                >
                  <Image
                    style={{
                      width: "100%",
                      //alignSelf: "center",
                      resizeMode: "contain",
                      height: 230,
                      borderRadius: 8
                    }}
                    source={{ uri: data.img }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 10,
                    width: "100%",
                    alignSelf: "center",
                    //  borderWidth: 1,
                    //  height: 20,
                    flexDirection: "row",
                    marginBottom: 10,
                    alignItems: "center",
                    marginBottom: 40
                  }}
                >
                  <AntDesign name="like2" size={29} color="red" />
                  <Text style={{ marginLeft: 5 }}>10</Text>

                  <EvilIcons
                    style={{ marginLeft: 20 }}
                    name="comment"
                    size={35}
                    color="red"
                  />
                  <Text style={{ marginLeft: 5 }}>10</Text>
                </View>
              </View>
            );
          })}
        </Content>
      </Container>
    );
  }
}
mapStateToProps = state => {
  return {
    confirmResult: state.AuthReducer.confirmResult,
    isErr: state.AuthReducer.isErr,
    err: state.AuthReducer.err,
    userName: state.AuthReducer.userName,
    cellNo: state.AuthReducer.cellNo,
    newMessage: state.AuthReducer.message,
    profilePicture: state.AuthReducer.profilePicture,
    imageUrl: state.AuthReducer.imageUrl,
    post: state.AuthReducer.post
  };
};
mapActionsToProps = dispatch => ({
  UserAction: bindActionCreators(UserAction, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(NewsFeed);
