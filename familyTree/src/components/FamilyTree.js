import React, {Component} from 'react';
import {View, Text, FlatList, Image, Alert} from 'react-native';
import PropTypes from 'prop-types';
import Svg, {Line} from 'react-native-svg';
import {TreeData} from '../testData';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import {COLORS} from '../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class FamilyTree extends Component {
  constructor(props) {
    super(props);
  }

  hasChildren(member) {
    return member.children && member.children.length;
  }

  getUserInfo(item) {
    this.props.nodeClick(item);
  }

  renderTree(data, level) {
    return (
      <FlatList
        data={data}
        horizontal={true}
        style={{paddingBottom: 10}}
        contentContainerStyle={{padding: 50}}
        keyExtractor={(item, index) => `${item.name} + ${item.spouse}`}
        listKey={(item, index) => `${item.name} + ${item.spouse}`}
        initialScrollIndex={0}
        renderItem={({item, index}) => {
          const {Name, spouse, dob, dod, Zurag, spouseProfile} = item;
          const info = {Name, spouse, dob, dod, Zurag, spouseProfile};
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: this.props.siblingGap / 2,
                paddingRight: this.props.siblingGap / 2,
              }}>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    this.getUserInfo(item);
                  }}
                  style={{
                    ...this.props.nodeStyle,
                    flexDirection: 'row',
                    padding: 2,
                  }}>
                  <Image
                    style={{
                      ...this.props.imageStyle,
                      width: !info.spouseProfile ? '100%' : '50%',
                      height: !info.spouseProfile ? '100%' : '50%',
                    }}
                    source={{
                      uri: info.Zurag
                        ? info.Zurag
                        : 'https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png',
                    }}
                  />
                  {info.spouseProfile ? (
                    <Image
                      style={{...this.props.imageStyle}}
                      source={{uri: info.spouseProfile}}
                    />
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>
                <Text
                  style={{
                    ...this.props.nodeTitleStyle,
                    color: this.props.nodeTitleColor,
                  }}>
                  {info.Name}
                </Text>
                {info.spouseProfile ? (
                  <Text
                    style={{
                      ...this.props.nodeTitleStyle,
                      color: this.props.nodeTitleColor,
                    }}>
                    Spouse: {info.spouse}
                  </Text>
                ) : (
                  <></>
                )}
              </View>
              {this.hasChildren(item) ? (
                <Svg height="50" width="20">
                  <Line
                    x1="50%"
                    y1="0"
                    x2="50%"
                    y2="150"
                    stroke={this.props.pathColor}
                    strokeWidth={this.props.strokeWidth}
                  />
                </Svg>
              ) : (
                <></>
              )}
              <View style={{flexDirection: 'row'}}>
                {this.hasChildren(item) ? (
                  item.children.map((child, index) => {
                    const {name, spouse, dob, dod, profile} = child;
                    const info = {name, spouse, dob, dod, profile};
                    return (
                      <View
                        key={child.name + child.spouse}
                        style={{flexDirection: 'row'}}>
                        <View>
                          <Svg height="50" width="100%">
                            <Line
                              x1="50%"
                              y1="0"
                              x2="50%"
                              y2="100%"
                              stroke={this.props.pathColor}
                              strokeWidth={this.props.strokeWidth}
                            />
                            {/* Right side horizontal line */}
                            {this.hasChildren(item) ? (
                              item.children.length != 1 &&
                              item.children.length - 1 !== index && (
                                <Line
                                  x1="100%"
                                  y1={this.props.strokeWidth / 2}
                                  x2="50%"
                                  y2={this.props.strokeWidth / 2}
                                  stroke={this.props.pathColor}
                                  strokeWidth={this.props.strokeWidth}
                                />
                              )
                            ) : (
                              <></>
                            )}
                            {/* Left side horizontal line */}
                            {this.hasChildren(item) &&
                            item.children.length != 1 &&
                            index !== 0 ? (
                              <Line
                                x1="50%"
                                y1={this.props.strokeWidth / 2}
                                x2="0"
                                y2={this.props.strokeWidth / 2}
                                stroke={this.props.pathColor}
                                strokeWidth={this.props.strokeWidth}
                              />
                            ) : (
                              <></>
                            )}
                          </Svg>
                          {this.renderTree([child], level + 1)}
                        </View>
                        <View
                          style={{
                            height: this.props.strokeWidth,
                            backgroundColor:
                              this.hasChildren(item) &&
                              item.children.length - 1 !== index
                                ? this.props.pathColor
                                : 'transparent',
                            width:
                              this.hasChildren(child) &&
                              child.children.length - 1 !== index
                                ? level * this.props.familyGap
                                : 0,
                          }}
                        />
                      </View>
                    );
                  })
                ) : (
                  <></>
                )}
              </View>
            </View>
          );
        }}
      />
    );
  }

  render() {
    const {title, titleStyle, titleColor} = this.props;
    return (
      <View style={{flex: 1}}>
        <Text style={{...titleStyle, color: titleColor}}>{title}</Text>
        {this.renderTree(this.props.data, 1)}
      </View>
    );
  }
}

FamilyTree.propTypes = {
  title: PropTypes.string,
  titleStyle: PropTypes.object,
  data: PropTypes.array,
  nodeStyle: PropTypes.object,
  nodeTitleStyle: PropTypes.object,
  pathColor: PropTypes.string,
  siblingGap: PropTypes.number,
  imageStyle: PropTypes.object,
  nodeTitleColor: PropTypes.string,
  familyGap: PropTypes.number,
  strokeWidth: PropTypes.number,
  titleColor: PropTypes.string,
};
