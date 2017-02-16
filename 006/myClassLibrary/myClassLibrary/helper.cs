using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace myClassLibrary
{
    public class helper
    {
        
        //获取指定点的颜色
        public class ColorHelper
        {
            [DllImport("gdi32.dll")]
            static private extern uint GetPixel(IntPtr hDC, int XPos, int YPos);
            [DllImport("gdi32.dll")]
            static private extern IntPtr CreateDC(string driverName, string deviceName, string output, IntPtr lpinitData);
            [DllImport("gdi32.dll")]
            static private extern bool DeleteDC(IntPtr DC);
            static private byte GetRValue(uint color)
            {
                return (byte)color;
            }
            static private byte GetGValue(uint color)
            {
                return ((byte)(((short)(color)) >> 8));
            }
            static private byte GetBValue(uint color)
            {
                return ((byte)((color) >> 16));
            }
            private static string colorRGBtoHx16(int R, int G, int B)
            {
                return System.Drawing.ColorTranslator.ToHtml(System.Drawing.Color.FromArgb(R, G, B));
            }
            public static string 获取指定坐标的16进制颜色(string x ,string y)
            {
                IntPtr displayDC = CreateDC("DISPLAY", null, null, IntPtr.Zero);
                uint colorref = GetPixel(displayDC, Convert.ToInt32(x), Convert.ToInt32(y));

                DeleteDC(displayDC);
                byte Red = GetRValue(colorref);
                byte Green = GetGValue(colorref);
                byte Blue = GetBValue(colorref);

                return colorRGBtoHx16(Red, Green, Blue);
            }

        }
        



        /// <summary>
        /// 注册热键Shift+S，Id号为100。HotKey.KeyModifiers.Shift也可以直接使用数字4来表示。
        /// HotKey.RegisterHotKey(Handle, 100, HotKey.KeyModifiers.Shift, Keys.S);
        /// </summary>
        public class HotKey
        {
            //如果函数执行成功，返回值不为0。
            //如果函数执行失败，返回值为0。要得到扩展错误信息，调用GetLastError。
            [DllImport("user32.dll", SetLastError = true)]
            public static extern bool RegisterHotKey(
                IntPtr hWnd,                //要定义热键的窗口的句柄
                int id,                     //定义热键ID（不能与其它ID重复）           
                KeyModifiers fsModifiers,   //标识热键是否在按Alt、Ctrl、Shift、Windows等键时才会生效
                Keys vk                     //定义热键的内容
                );

            [DllImport("user32.dll", SetLastError = true)]
            public static extern bool UnregisterHotKey(
                IntPtr hWnd,                //要取消热键的窗口的句柄
                int id                      //要取消热键的ID
                );

            //定义了辅助键的名称（将数字转变为字符以便于记忆，也可去除此枚举而直接使用数值）
            [Flags()]
            public enum KeyModifiers
            {
                None = 0,
                Alt = 1,
                Ctrl = 2,
                Shift = 4,
                WindowsKey = 8
            }
        }


        //键盘
        public class 键盘
        {
            [DllImport("user32.dll", EntryPoint = "keybd_event")]
            public static extern void keybd_event(
                byte bVk, //虚拟键值
                byte bScan,// 一般为0
                int dwFlags, //这里是整数类型 0 为按下，2为释放
                int dwExtraInfo //这里是整数类型 一般情况下设成为 0
            );

            public static void  按键(byte keycode)
            {
                Random r = new Random();
                keybd_event(keycode, 0, 0, 0);
                System.Threading.Thread.Sleep(r.Next(70, 120));
                keybd_event(keycode, 0, 2, 0);
            }

        }

        //鼠标

        //ascii 
        public static string Chr(int asciiCode)
        {
            if (asciiCode >= 0 && asciiCode <= 255)
            {
                System.Text.ASCIIEncoding asciiEncoding = new System.Text.ASCIIEncoding();
                byte[] byteArray = new byte[] { (byte)asciiCode };
                string strCharacter = asciiEncoding.GetString(byteArray);
                return (strCharacter);
            }
            else
            {
                throw new Exception("ASCII Code is not valid.");
            }
        }

    }
}
