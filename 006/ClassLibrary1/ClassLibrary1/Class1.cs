using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography.X509Certificates;
using System.Speech.Synthesis;
using System.Net;
using System.IO;

namespace ClassLibrary1
{
    public class Class1 : BilibiliDM_PluginFramework.DMPlugin
    {
        public Class1()
        {
            this.Connected += Class1_Connected;
            this.Disconnected += Class1_Disconnected;
            this.ReceivedDanmaku += Class1_ReceivedDanmaku;
            this.ReceivedRoomCount += Class1_ReceivedRoomCount;
            this.PluginAuth = "时代小召唤";
            this.PluginName = "时代小召唤的插件";
            this.PluginCont = "527993075@qq.com";
            this.PluginVer = "v0.0.1";
            this.PluginDesc = "目前包含朗读弹幕";
        }


        private void Class1_ReceivedRoomCount(object sender, BilibiliDM_PluginFramework.ReceivedRoomCountArgs e)
        {
            //Log("房间人数" + e.UserCount);
        }

        private void Class1_ReceivedDanmaku(object sender, BilibiliDM_PluginFramework.ReceivedDanmakuArgs e)
        {
            try
            {
                if (e == null)
                {
                    return;
                }

                SpeechSynthesizer s = new SpeechSynthesizer();
                if (s != null)
                {
                    if (e.Danmaku.CommentText.Contains("666") || e.Danmaku.CommentText.Contains("233"))
                    {
                        string str = string.Empty;
                        foreach (var item in e.Danmaku.CommentText)
                        {
                            str += item;
                            str += " ";
                        }
                        e.Danmaku.CommentText = str;
                    }
                    s.Volume = 50;
                    s.SpeakAsync(e.Danmaku.CommentText);
                    if (e.Danmaku.CommentText.StartsWith("点歌"))
                    {
                        string musicname = e.Danmaku.CommentText.Replace("点歌", "");
                        string re = HttpGet("http://music.163.com/api/search/pc", "s=" + musicname + "&offset=0&limit=20&");
                        Log(re);
                    }
                    //Log(e.Danmaku.CommentText);
                }
            }
            catch (Exception)
            {
                
            }
            
            
        }

        private void Class1_Disconnected(object sender, BilibiliDM_PluginFramework.DisconnectEvtArgs e)
        {
            Log("断开连接");
        }

        private void Class1_Connected(object sender, BilibiliDM_PluginFramework.ConnectedEvtArgs e)
        {
            Log("连接成功"+ e.roomid);
        }


        public override void Admin()
        {
            base.Admin();
            Console.WriteLine("Hello World");
            this.Log("Hello World");
            this.AddDM("Hello World", true);
        }

        public override void Stop()
        {
            base.Stop();
            //請勿使用任何阻塞方法
            Console.WriteLine("Plugin Stoped!");
            this.Log("Plugin Stoped!");
            this.AddDM("Plugin Stoped!", true);
        }

        public override void Start()
        {
            base.Start();
            //請勿使用任何阻塞方法
            Console.WriteLine("Plugin Started!");
            this.Log("Plugin Started!");
            this.AddDM("Plugin Started!", true);
        }

        public string HttpGet(string Url, string postDataStr)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(Url + (postDataStr == "" ? "" : "?") + postDataStr);
            request.Method = "GET";
            request.ContentType = "application/json;charset=UTF-8";

            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Stream myResponseStream = response.GetResponseStream();
            StreamReader myStreamReader = new StreamReader(myResponseStream, Encoding.GetEncoding("utf-8"));
            string retString = myStreamReader.ReadToEnd();
            myStreamReader.Close();
            myResponseStream.Close();

            return retString;
        }

    }
}
