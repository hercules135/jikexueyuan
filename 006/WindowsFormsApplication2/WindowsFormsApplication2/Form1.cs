using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Speech.Synthesis;
using System.Threading;

namespace WindowsFormsApplication2
{
    public partial class Form1 : Form
    {
        bool isOn = false;
        Thread thread;
        public Form1()
        {
            InitializeComponent();
            //注册热键Shift+S，Id号为100。HotKey.KeyModifiers.Shift也可以直接使用数字4来表示。
            myClassLibrary.helper.HotKey.RegisterHotKey(Handle, 100, myClassLibrary.helper.HotKey.KeyModifiers.Shift, Keys.S);
        }

        protected override void WndProc(ref Message m)
        {
            const int WM_HOTKEY = 0x0312;//如果m.Msg的值为0x0312那么表示用户按下了热键
            //按快捷键 
            switch (m.Msg)
            {
                case WM_HOTKEY:
                    switch (m.WParam.ToInt32())
                    {
                        case 100:    //按下的是Shift+S
                            //此处填写快捷键响应代码         
                            //MessageBox.Show("ok");
                            if (isOn)
                            {
                                SpeechSynthesizer synth = new SpeechSynthesizer();

                                synth.Speak("结束自动右键");

                                synth.Dispose();

                                isOn = false;

                                if (thread.IsAlive)
                                {
                                    thread.Abort();
                                }
                            }
                            else
                            {
                                SpeechSynthesizer synth = new SpeechSynthesizer();

                                synth.Speak("开始自动右键");

                                synth.Dispose();
                                isOn = true;

                                thread = new Thread(attack);
                                thread.Start();
                            }
                            break;
                    }
                    break;
            }
            base.WndProc(ref m);
        }

        public void attack()
        {
            while (isOn)
            {
                Random r = new Random();
                mouse_event(MOUSEEVENTF_RIGHTDOWN, 0, 0, 0, 0);
                System.Threading.Thread.Sleep(r.Next(90, 280));
                mouse_event(MOUSEEVENTF_RIGHTUP, 0, 0, 0, 0);
                System.Threading.Thread.Sleep(r.Next(1090, 2280));
                myClassLibrary.helper.键盘.按键(51);
                System.Threading.Thread.Sleep(r.Next(590, 1280));
            }
        }


        [System.Runtime.InteropServices.DllImport("user32")]
        private static extern int mouse_event(int dwFlags, int dx, int dy, int cButtons, int dwExtraInfo);

        const int MOUSEEVENTF_MOVE = 0x0001;      //移动鼠标 
        const int MOUSEEVENTF_LEFTDOWN = 0x0002; //模拟鼠标左键按下 
        const int MOUSEEVENTF_LEFTUP = 0x0004; //模拟鼠标左键抬起 
        const int MOUSEEVENTF_RIGHTDOWN = 0x0008; //模拟鼠标右键按下 
        const int MOUSEEVENTF_RIGHTUP = 0x0010; //模拟鼠标右键抬起 
        const int MOUSEEVENTF_MIDDLEDOWN = 0x0020; //模拟鼠标中键按下 
        const int MOUSEEVENTF_MIDDLEUP = 0x0040; //模拟鼠标中键抬起 
        const int MOUSEEVENTF_ABSOLUTE = 0x8000; //标示是否采用绝对坐标 
        [DllImport("user32.dll")]
        static extern bool SetCursorPos(int X, int Y);

        [DllImport("user32.dll", EntryPoint = "keybd_event")]

        public static extern void keybd_event(

        byte bVk, //虚拟键值

        byte bScan,// 一般为0

        int dwFlags, //这里是整数类型 0 为按下，2为释放

        int dwExtraInfo //这里是整数类型 一般情况下设成为 0

        );

        private void label1_Click(object sender, EventArgs e)
        {

        }

    }
}
